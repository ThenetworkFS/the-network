import { fire, db } from '../fire'
import React from 'react'
import { getUser } from '../store'
import { connect } from 'react-redux'
import history from '../history'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.signInAnonymously = this.signInAnonymously.bind(this)
  }


  signInAnonymously(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    return fire.auth().signInWithEmailAndPassword(email, password)
    .then(() => history.push('/home'))
      .catch(err => console.error(err))
  }


  render() {
    return (
      <div>
        <form onSubmit={this.signInAnonymously}>
          <h4>Login</h4>
          <div>
            <h6>Email</h6>
            <input name="email" />
          </div>
          <div>
            <h6>Password</h6>
            <input name="password" />
          </div>
          <button type="submit">Login</button>
          </form>
          <h6>OR</h6>
          <h6>Login with</h6>
          <button>Google</button>
      </div>
    )
  }
}


export default Login
