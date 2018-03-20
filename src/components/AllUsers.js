import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { Input } from 'semantic-ui-react'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      searchVal: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {
    let currentComponent = this
    db.collection("users")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              users: currentComponent.state.users.concat(change.doc.data())
            });
          }
        });
      })
  }

  handleInputChange(event){
    event.preventDefault()
    this.setState({
      searchVal: event.target.value
    })
  }



  render() {

    console.log('STATE: ', this.state)

    const filteredUsers = this.state.users.filter((user) => {
      return user.firstName.includes(this.state.searchVal)
    })

    return (
      <div>
        <Input
          onChange={this.handleInputChange}
          icon={{ name: 'search', circular: true, link: true }}
          placeholder='Search...'
        />
        {this.state.searchVal
          ? filteredUsers.map((user => {
            return (
              <h1>{user.firstName}</h1>
              )
            })
          )
          : this.state.users.map((user => {
            return (
              <h1>{user.firstName}</h1>
              )
            })
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(AllUsers)
