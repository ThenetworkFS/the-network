import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
      <h1>The Network</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/">Sign out</Link>
      </nav>
    </div>
  )
}


export default Navbar