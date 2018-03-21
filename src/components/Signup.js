import { fire, db } from '../fire'
import React from 'react'
import firebase from 'firebase'
import history from '../history'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.googleSignUp = this.googleSignUp.bind(this)
  }


  componentDidMount() {
    if (this.state.isRedirect) {
      fire.auth().getRedirectResult()
        .then(result => {
          db.collection('users').doc(result.user.email).set({ email: result.user.email })
        })
    }
  }


  handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const user = {
      email,
      firstName,
      lastName,
    }
    fire.auth().createUserWithEmailAndPassword(email, password)
    db.collection('users').doc(email).set(user)
      .then(() => history.push('/home'))
      .catch(err => console.error(err))
  }


  googleSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider()
    fire.auth().signInWithRedirect(provider)
    this.setState({ isRedirect: true })
  }


  render() {
    return (
      <div>
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
        <h6>OR</h6>
        <h6>Sign up with</h6>
        <button onClick={this.googleSignUp}>Google</button>
      </div>
    )
  }
}


export default Signup;
