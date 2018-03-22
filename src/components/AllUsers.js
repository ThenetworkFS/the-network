import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { Input } from 'semantic-ui-react'
import {AdvancedSearch} from './index.js'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      searchVal: '',
      advancedIsClicked: false
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

  handleAdvancedClick=(event)=> {
    event.preventDefault(event)
    this.setState({
      advancedIsClicked: true
    })
  }



  render() {

    console.log('All users STATE: ', this.state)

    const filteredUsers = this.state.users.filter((user) => {
      return user.firstName.includes(this.state.searchVal) ||
             user.lastName.includes(this.state.searchVal)
    })

    return (
      <div>
      <h1>Search Users: </h1>
        <Input
          onChange={this.handleInputChange}
          icon={{ name: 'search', circular: true, link: true }}
          placeholder='Search...'
        />
        <Button
          onClick={this.handleAdvancedClick}
          >Advanced Search
        </Button>
      {this.state.advancedIsClicked && <AdvancedSearch />}

        {this.state.searchVal
          ? filteredUsers.map((user => {
            return (
              <div>
                <Card>
                {/* <Image src='./download.jpg' /> */}
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                  <Card.Meta>{user.cohort} {user.cohortNum}</Card.Meta>
                </Card.Content>
            </Card>
              </div>
              )
            })
          )
          : this.state.users.map((user => {
            return (
              <div>
                <Card>
                {/* <Image src='./download.jpg' /> */}
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                  <Card.Meta>{user.cohort} {user.cohortNum}</Card.Meta>
                </Card.Content>
            </Card>
            </div>
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
