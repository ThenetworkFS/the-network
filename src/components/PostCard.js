import React, { Component } from 'react'
import MicrolinkCard from 'react-microlink'
import history from '../history'
import { connect } from 'react-redux'
import { db } from '../fire'
import { selectUser } from '../store'
import { Card, Image } from 'semantic-ui-react'


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
        </Card>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  selectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
