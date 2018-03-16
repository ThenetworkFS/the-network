import fire from '../fire.js'
import React from 'react'

fire.auth()

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    console.log('submit')
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => console.log(user))
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
        <button>Google</button>
      </div>
    )
  }
}


export default Signup