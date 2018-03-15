import { fire as fs } from '../fire.js'
import React from 'react'



const Signup = () => {
  return (
    // const signupAnom = () => auth.signInAnonymously()

    // const signupGoogle = () => auth
    <div>
      <form>
      <div>
        <input name="firstName" />
        </div>
        <div>
        <input name="lastName" />
        </div>
        <div>
        <input name="email" />
        </div>
        <div>
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