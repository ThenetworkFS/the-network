import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import { Navbar } from './components'
import { getUser, startFetch, stopFetch } from './store'
import { connect } from 'react-redux'
import { fire, db } from './fire'


class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('googleLogin') === '1') {
      this.props.startFetch()
    }
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.removeItem('googleLogin');
        db.collection('users')
        .doc(user.email)
        .onSnapshot(user => {
          this.props.getUser(user.data())
          this.props.stopFetch()
        })
      }
    })
    fire.auth().getRedirectResult()
    .then(result => {
      if (result.credential) {
        const firstName = result.user.displayName.split(' ')[0]
        const lastName = result.user.displayName.split(' ')[1]
        const email = result.user.email
        db.collection('users')
        .doc(result.user.email)
        .set({
          firstName,
          lastName,
          email
        })          
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // only go to /home when we get the user from Firestore
    if(
      Object.keys(this.props.loggedInUser).length === 0 &&
      this.props.loggedInUser.constructor === Object &&
      nextProps.loggedInUser.email
    ){
      history.push('/home')
    }
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


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

const mapDispatchToProps = {
  getUser,
  startFetch,
  stopFetch,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
