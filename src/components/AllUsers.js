import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      users:[]
    }
  }

  componentDidMount(){
    let currentComponent = this

    db.collection("users")
    .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges.forEach((change) => {
        if(change.type === "added"){
          currentComponent.setState({
            users: currentComponent.state.users.concat(change.doc.data())
          });
        }
    });
  })
    }

  render() {
    return (
      <div>
        <h1>All Users </h1>
        {this.state.users.map((user) => {
      return (
        <div>
          <h1> {user.firstName} {user.lastName} </h1>
          <br></br>
        </div>
      )
    })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(AllUsers)


