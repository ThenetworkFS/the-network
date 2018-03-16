import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import { Navbar } from './components'
import { getUser } from './store'
import { connect } from 'react-redux'
import { fire, db } from './fire'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user){
      return db.collection('users')
      .doc(user.email)
      .get()
        .then((user) => {
          this.props.getUser(user.data())
          console.log(this.props.loggedInUser)
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


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })


const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => {
    dispatch(getUser(user))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
