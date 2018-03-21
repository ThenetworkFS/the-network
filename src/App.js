import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import { Navbar } from './components'
import { getUser, selectUser } from './store'
import { connect } from 'react-redux'
import { fire, db } from './fire'
const uuidv1 = require('uuid/v1')


class App extends Component {


  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        return db.collection('users')
          .doc(user.email)
          .onSnapshot(user => {
            this.props.getUser(user.data())
            if (this.props.selectedUser.email === this.props.loggedInUser.email) {
              this.props.selectUser(user.data())
            }
          })
      }
    })
    fire.auth().getRedirectResult()
      .then(result => {
        if (result.credential) {
          const firstName = result.user.displayName.split(' ')[0]
          const lastName = result.user.displayName.split(' ')[1]
          const email = result.user.email
          const id = uuidv1()
          db.collection('users')
            .doc(result.user.email)
            .set({
              firstName,
              lastName,
              email,
              id
            })
        }
      })
  }


  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Routes />
        </div>
      </Router>
    );
  }
}


const mapStateToProps = ({ user: { loggedInUser, selectedUser } }) => ({ loggedInUser, selectedUser })


const mapDispatchToProps = {
  getUser, selectUser
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
