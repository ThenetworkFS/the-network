import React, { Component } from 'react'
import MicrolinkCard from 'react-microlink'
import history from '../history'
import { connect } from 'react-redux'
import { db } from '../fire'
import { selectUser } from '../store'
import { Card, Image, Button, Form, Input, TextArea} from 'semantic-ui-react'


class PostCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewComments: false,
      comments: [],
      newComment: ''
    }
  }

  formatPostWithLink = (post) => {
    const linkIndex = post.content.indexOf(post.link)
    const linkLength = post.link.length
    const contentFirstPart = post.content.slice(0, linkIndex);
    const contentSecondPart = post.content.slice(linkIndex + linkLength);
    return (
      <div className="formatted-post">
        <span>{contentFirstPart}</span>
        <a href={post.link} target="_blank">{post.link}</a>
        <span>{contentSecondPart}</span>
      </div>
    )
  }

  onUserNameClick = (event, user) => {
    event.preventDefault()
    return db.collection('users')
      .doc(user.email)
      .get()
      .then(user => {
        this.props.selectUser(user.data())
        history.push(`/profile/${user.data().id}`)
      })
  }
  onViewCommentsClick = (event) => {
    event.preventDefault()
    let currentThis = this
    this.setState({
      viewComments: !this.state.viewComments,
    })
    db.collection('posts').doc(this.props.post.id).collection('comments').get().then((doc)=>{
      doc.forEach((comment)=>{
        this.setState({
          comments: currentThis.state.comments.concat(comment.data())
        })
      })
    })
  }

  onAddCommentClick = (event) => {
    event.preventDefault()
    db.collection('posts').doc(this.props.post.id).collection('comments').add({
      userEmail: this.props.loggedInUser.email,
      firstName: this.props.loggedInUser.firstName,
      lastName: this.props.loggedInUser.lastName,
      content: this.state.newComment
    })
  }

  handleCommentChange = (e, { value }) => this.setState({ newComment: value })

  render() {
    console.log('STATE', this.state)
    const { post } = this.props;
    return (
      <div className="postcard-container">
        <Card className="postcard">
          <Card.Content>
            <Image floated='left' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg' />
            <Card.Header>
              <a onClick={(event) => this.onUserNameClick(event, post.user)}>{post.user.firstName} {post.user.lastName}</a>
            </Card.Header>
            <Card.Meta>
              FS - 1801
            </Card.Meta>
            {post.link ? (
              <div>
                <Card.Description>
                  {this.formatPostWithLink(post)}
                </Card.Description>
                <MicrolinkCard
                  round
                  url={post.link}
                  target='_blank'
                />
              </div>
            ) : (
              <Card.Description>
                <div className="formatted-post">
                  {post.content}
                </div>
              </Card.Description>
            )}
          </Card.Content>
          {this.state.viewComments
          ?
          <div>
            <Button
              onClick={this.onViewCommentsClick}
              >Hide Comments
            </Button>
            <Form
              onSubmit={this.onAddCommentClick}
              >
              <Form.Field
                control={TextArea}
                label='Comment'
                placeholder='Add Comment...'
                onChange={this.handleCommentChange}
                />
              <Button
                type="submit"
                >Add Comment
              </Button>
            </Form>
          </div>
          :
          <Button
            onClick={this.onViewCommentsClick}
            >View Comments
          </Button>}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })

const mapDispatchToProps = {
  selectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
