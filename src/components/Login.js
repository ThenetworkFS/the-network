import { fire, db } from '../fire'
import React from 'react'
import { getUser } from '../store'
import { connect } from 'react-redux'
import history from '../history'
import firebase from 'firebase'


class Login extends React.Component {
  constructor(props) {
    super(props)
    
    this.signInAnonymously = this.signInAnonymously.bind(this)
    this.googleLogin = this.googleLogin.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loggedInUser.email){
      history.push('/home')
    }
  }


  signInAnonymously(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    return fire.auth().signInWithEmailAndPassword(email, password)
      .then(() => history.push('/home'))
      .catch(err => console.error(err))
  }


  googleLogin(event) {
    event.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    fire.auth().signInWithRedirect(provider)
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
        <button onClick={this.googleLogin}>Google</button>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

export default connect(mapStateToProps)(Login)
