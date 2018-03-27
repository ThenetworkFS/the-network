import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { db } from '../fire'
import history from '../history'
import { selectUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { PostCard } from './'

class PostSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      searchVal: '',
      selectedCategory: "allPosts"
    }
  }

  componentDidMount() {
    let currentComponent = this
    db.collection("posts")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              posts: currentComponent.state.posts.concat(change.doc.data())
            });
          }
        });
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

  onSearchChange = (event) => {
    event.preventDefault()
    this.setState({
      searchVal: event.target.value
    })
  }
  onDropdownChange = (event, params) =>{
    event.preventDefault()
    this.setState({
      selectedCategory: params.value
    })
  }

  render() {
    const user = this.props.loggedInUser

    const dropdownOptions = [
      {
        key: "allPosts",
        value: "allPosts",
        text: "all posts"
      },
      {
        key: "news",
        value: "news",
        text: "news"
      },
      {
        key: "meetup",
        value: "meetup",
        text: "meetup"
      }, {
        key: "projects",
        value: "projects",
        text: "projects"
      },
      {
        key: "forum",
        value: "forum",
        text: "forum"
      }
    ]


    let postsToShow = this.state.posts.filter((post)=>{

      if (this.state.selectedCategory === "allPosts"){
        return post.content
                .toLowerCase()
                .includes(this.state.searchVal.toLowerCase())
      } else {
        return post.category === this.state.selectedCategory
          && post.content
              .toLowerCase()
              .includes(this.state.searchVal.toLowerCase())
      }
    })

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
        <Dropdown
          onChange={this.onDropdownChange}
          placeholder='Category'
          search
          selection
          options={dropdownOptions}
          />
        {postsToShow.map((post, index) => {
            return (
              <PostCard key={index} post={post} user={user} />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  selectUser
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSearch))
