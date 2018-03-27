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

  listen({category}) {
    if (this.unsub) this.unsub()

    this.unsub = db.collection("posts").where('category', '==', category).orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        this.setState({
          posts: querySnapshot.docs.map(doc => doc.data())
        })
      })

        // querySnapshot.docChanges.forEach((change) => {
        //   if (change.type === "added") {
        //     const newPost = { ...change.doc.data(), id: change.doc.id }
        //     currentComponent.setState({
        //       posts: [newPost].concat(currentComponent.state.posts),
        //       isPostSubmitted: false,
        //     });
        //   }
        // });
      // })
  }

  componentDidMount() {
    this.listen(this.props)
  }

  componentWillUnmount() {
    if (this.unsub) this.unsub()
  }

  componentWillReceiveProps({category}) {
    if (category !== this.props.category) {
      this.listen({category})
    }
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
