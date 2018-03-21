import React, { Component } from 'react'
import MicrolinkCard from 'react-microlink'
import history from '../history'
import { connect } from 'react-redux'
import { db } from '../fire'
import { selectUser } from '../store'

class PostCard extends Component {
  constructor(props) {
    super(props)
  }

  formatPostWithLink = (post) => {
    const linkIndex = post.content.indexOf(post.link)
    const linkLength = post.link.length
    const contentFirstPart = post.content.slice(0, linkIndex);
    const contentSecondPart = post.content.slice(linkIndex + linkLength);
    return (
      <span>
        {contentFirstPart}
        <a href={post.link} target="_blank">{post.link}</a>
        {contentSecondPart}
      </span>
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
      <div>
        <a onClick={(event) => this.onUserNameClick(event, post.user)}>{post.user.firstName} {post.user.lastName}</a>
        {post.link ? (
          <div>
            {this.formatPostWithLink(post)}
            <MicrolinkCard
              round
              url={post.link}
              target='_blank'
            />
          </div>
        ) : (
          <span>{post.content}</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  selectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
