import { fire as fs } from '../fire.js'
import React from 'react'



const Signup = () => {
  // const signupAnom = () => auth.signInAnonymously()

  // const signupGoogle = () => auth
  return (
    <div>
      <form>
        <h4>Sign up</h4>
        <div>
          <h8>First Name</h8>
          <input name="firstName" />
        </div>
        <div>
          <h8>Last Name</h8>
          <input name="lastName" />
        </div>
        <div>
          <h8>Email</h8>
          <input name="email" />
        </div>
        <div>
          <h8>Password</h8>
          <input name="password" />
        </div>
      </form>
      <button>Sign up</button>
      <h6>OR</h6>
      <h6>Sign up with</h6>
      <button>Google</button>
    </div>
  )
}

export default Signup