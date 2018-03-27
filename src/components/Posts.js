import React, { Component } from 'react'
import { connect } from 'react-redux'
import { db } from '../fire'
import { selectUser } from '../store'
import { PostCard } from './'

class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    let currentComponent = this
    db.collection("posts").orderBy("timestamp")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            const newPost = { ...change.doc.data(), id: change.doc.id }
            currentComponent.setState({
              posts: [newPost].concat(currentComponent.state.posts),
              isPostSubmitted: false,
            });
          }
        });
      })
  }

  onPostDelete = (event, id) => {
    event.preventDefault()
    db
      .collection('posts')
      .doc(id)
      .delete()
      .catch(err => console.error(err))
      const filtered= this.state.posts.filter(post => post.id !== id)
      this.setState({ posts: filtered })
  }

  render() {
    const { posts } = this.state;
    const user = this.props.loggedInUser
    return (
      <div>
        {
          posts
          .filter(post => post.category === this.props.category)
          .map((post, index) => <PostCard key={index} post={post} user={user} onPostDelete={this.onPostDelete} /> )
        }
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  selectUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)
