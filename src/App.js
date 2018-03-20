import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import { Navbar } from './components'
import { getUser } from './store'
import { connect } from 'react-redux'
import { fire, db } from './fire'


class App extends Component {


  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        return db.collection('users')
          .doc(user.email)
          .onSnapshot(user => {
            this.props.getUser(user.data())
          })
      }
    })
    fire.auth().getRedirectResult()
    .then(result => {
      if (result.credential) {
        db.collection('users').doc(result.user.email).set({ email: result.user.email })          
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


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
