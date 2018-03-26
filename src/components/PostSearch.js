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
    }
  }
  // componentDidMount() {
  //   let currentComponent = this
  //   db.collection("posts")
  //     .where("category", "==", this.props.category)
  //     .onSnapshot(function (querySnapshot) {
  //       querySnapshot.docChanges.forEach((change) => {
  //         if (change.type === "added") {
  //           currentComponent.setState({
  //             posts: currentComponent.state.posts.concat(change.doc.data())
  //           });
  //         }
  //       });
  //     })
  // }

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
        })
    }
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
    console.log('POSTS', this.state.posts)
    return (
      <div >
  <h1>Search {this.props.category}</h1>
    <Input
            onChange={this.onInputChange}
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search..."
            className="all-users-searchbar"
            name="searchVal"
          />
      </div>
    )
  }
}


const mapDispatchToProps = {
  selectUser
}


export default withRouter(connect(null, mapDispatchToProps)(PostSearch))
