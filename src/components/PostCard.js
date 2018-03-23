import React, { Component } from 'react'
import MicrolinkCard from 'react-microlink'
import history from '../history'
import { connect } from 'react-redux'
import { db } from '../fire'
import firebase from 'firebase'
import { selectUser } from '../store'
import { Card, Image, Button, Form, TextArea} from 'semantic-ui-react'
import { withRouter } from 'react-router'


class PostCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewComments: false,
      comments: [],
      newComment: '',
      loadingComments: true
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.category !== this.props.match.params.category){
      this.setState({
        viewComments:false,
        comments:[]
      })
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
    this.setState({
      loadingComments: true
    })

    let currentComponent = this
    db.collection("posts")
      .doc(this.props.post.id)
      .collection('comments')
      .orderBy("timestamp", "desc")
      .get().then((comments) => {
        let commentsArr = []
        comments.forEach((comment)=> {
          commentsArr.push(comment.data())
        })
        currentComponent.setState({
          comments: commentsArr
        });
          })
    this.setState({
      viewComments: true,
      loadingComments: false,
    })
  }
  onHideCommentsClick =(event) => {
    event.preventDefault()
    this.setState({
      viewComments: false,
      loadingComments: true
    })
  }

  onAddCommentClick = (event) => {
    event.preventDefault()
    this.clearTextarea();
    db.collection('posts')
    .doc(this.props.post.id)
    .collection('comments')
    .add({
      userEmail: this.props.loggedInUser.email,
      firstName: this.props.loggedInUser.firstName,
      lastName: this.props.loggedInUser.lastName,
      content: this.state.newComment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    this.setState({
      comments: [{
        userEmail: this.props.loggedInUser.email,
        firstName: this.props.loggedInUser.firstName,
        lastName: this.props.loggedInUser.lastName,
        content: this.state.newComment
      }].concat(this.state.comments)
    })
  }

  clearTextarea = () => {
    document.getElementById("new-comment-textarea").value = "";
  }

  handleCommentChange = (e, { value }) => this.setState({ newComment: value })

  render() {
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
          {this.state.loadingComments
            ? <h1>loading</h1>
            :
          <div>
            <Button
              onClick={this.onHideCommentsClick}
              >Hide Comments
            </Button>
            <Form className="new-comment-textarea"
              onSubmit={this.onAddCommentClick}
              >
              <TextArea
                required
                id="new-comment-textarea"
                label='Comment'
                placeholder='Add Comment...'
                onChange={this.handleCommentChange}
                />
              <Button
                type="submit"
                >Add Comment
              </Button>
                {this.state.comments && this.state.comments.map((comment, index) => {
                return (
                <div key={index}>
                  <h1>{comment.firstName} {comment.lastName} </h1>
                  <h2>{comment.content}</h2>
                </div>
                )
              })}
            </Form>
          </div>
            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))
