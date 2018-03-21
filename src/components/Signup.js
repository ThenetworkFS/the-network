import { startFetch, stopFetch } from '../store'
import { fire, db } from '../fire'
import React from 'react'
import firebase from 'firebase'
import history from '../history'
import { connect } from 'react-redux'
const uuidv1 = require('uuid/v1')



class Signup extends React.Component {
  constructor(props) {
    super(props)
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loggedInUser.email){
      history.push('/home')
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const id = uuidv1()
    const user = {
      email,
      firstName,
      lastName,
      id
    }
    return fire.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users').doc(email).set(user)
          .then(() => history.push('/home'))
          .catch(err => console.error(err))
      })
    this.props.startFetch()
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      db.collection('users')
      .doc(email)
      .set(user)
      .catch(err => console.error(err))
    })
  }

  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <form onSubmit={this.handleSubmit}>
            <h4>Sign up</h4>
            <div>
              <h6>First Name</h6>
              <input name="firstName" />
            </div>
            <div>
              <h6>Last Name</h6>
              <input name="lastName" />
            </div>
            <div>
              <h6>Email</h6>
              <input name="email" />
            </div>
            <div>
              <h6>Password</h6>
              <input name="password" />
            </div>
            <button type="submit">Sign up</button>
          </form>
        ) : (
          <div>Fetching</div>
        )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })
const mapDispatchToProps = {
  startFetch,
  stopFetch,
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup)
