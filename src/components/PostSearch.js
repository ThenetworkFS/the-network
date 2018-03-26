import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { db } from '../fire'
import history from '../history'
import { selectUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Input } from 'semantic-ui-react'


class PostSearch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      searchVal: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS', nextProps)
    if (nextProps.match.params.category !== this.props.match.params.category)  {
      let currentComponent = this
      db.collection("posts")
        .where("category", "==", nextProps.category)
        .onSnapshot(function (querySnapshot) {
          querySnapshot.docChanges.forEach((change) => {
            if (change.type === "added") {
              currentComponent.setState({
                posts: currentComponent.state.posts.concat(change.doc.data())
              });
            }
          });
        })
        this.setState({
          posts: [],
          searchVal:''
        })
    }
  }

  onSearchChange = (event) => {
    event.preventDefault()
    this.setState({
      searchVal: event.target.value
    })
  }

  filterPostsOnSearch = () => {
    const searchVal = this.state.searchVal;
    return this.state.posts.filter((post) => {
      return post.content.toLowerCase().includes(searchVal.toLowerCase()) ||
        post.user.firstName.toLowerCase().includes(searchVal.toLowerCase()) || post.user.lastName.toLowerCase().includes(searchVal.toLowerCase())
    })
  }


  onUserNameClick = (event, user) => {
    event.preventDefault()
    db.collection('users')
      .doc(user.email)
      .get()
      .then(user => {
        this.props.selectUser(user.data())
        history.push(`/profile/${user.data().id}`)
      })
  }


  render() {
    console.log('STATE', this.state)

    let filteredPosts;
      if (this.state.searchVal) {
        filteredPosts = this.filterPostsOnSearch()
      }
    let allPosts = this.state.posts
console.log('allPosts', allPosts)
    const { searchVal } = this.state

    return (
      <div >
  <h1>Search {this.props.category}</h1>
        <div className="all-posts-search-container">
          <Input
            onChange={this.onSearchChange}
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search..."
            className="posts-searchbar"
            name="searchVal"
          />
        </div>

          { searchVal === '' ? (

            allPosts.map((post)=>{
              return (
                <div>
                <h1>testing</h1>
                <h1>{post.content}</h1>
                </div>
              )
            }
            )
          ): (
            allPosts.map((post)=>{
              return (
                <h1>{post.content}</h1>
              )
            }
            )
          )

          }
      </div>
    )
  }
}


const mapDispatchToProps = {
  selectUser
}


export default withRouter(connect(null, mapDispatchToProps)(PostSearch))
