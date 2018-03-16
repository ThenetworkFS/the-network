import React from 'react'
import { Link } from 'react-router-dom'
import { removeUser } from '../store'
import { fire, db } from '../fire'
import history from '../history'
import { connect } from 'react-redux'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  
  
  render() {
    const user= this.props.loggedInUser
    return (
      <div>
        <h1>The Network</h1>
        <nav>
        { user.email ?
          <div>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <a href="#" onClick={this.props.removeUser}>
            Sign out
          </a>
          </div>
          :
          <div>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
          </div>
          }
        </nav>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })


const mapDispatchToProps = (dispatch) => ({
  removeUser: () => {
    fire.auth().signOut()
    dispatch(removeUser())
    history.push('/')
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
