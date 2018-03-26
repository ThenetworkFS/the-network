import React, { Component } from 'react'
import MicrolinkCard from 'react-microlink'
import history from '../history'
import { connect } from 'react-redux'
import { db } from '../fire'
import { selectUser } from '../store'
import { Card, Image } from 'semantic-ui-react'
import { CommentCard } from './'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'


class PostCard extends Component {
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


  deletePost = (event, id) => {
    event.preventDefault()
    db
      .collection('posts')
      .doc(id)
      .delete()
      .catch(err => console.error(err))
  }


  render() {
    const { post } = this.props;
    const user = this.props.loggedInUser
    return (
      <div className="postcard-container">
        <Card className="postcard">
          <Card.Content>
            <Image className={post.user.image ? "" : "postcard-anonymous anonymous"} floated='left' size='mini' src={post.user.image ? post.user.image : ANONYMOUS_USER_IMAGE_URL} />
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
          {post.user.id === user.id ?
            <button onClick={(event) => this.deletePost(event, post.id)}>Delete</button>
            : null
          }
          <CommentCard post={post} onUserNameClick={this.onUserNameClick} />
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
