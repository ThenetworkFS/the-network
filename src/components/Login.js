import { fire as fs } from '../fire.js'
import React from 'react'

const Login = () => {

  // const signupAnom = () => auth.signInAnonymously()

  // const signupGoogle = () => auth
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
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
        <h6>OR</h6>
        <h6>Login with</h6>
        <button>Google</button>
      </form>
    </div>
  )
}


export default Login