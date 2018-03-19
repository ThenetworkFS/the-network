import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'


class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    console.log('loggedInUser', this.props.loggedInUser)
    return (
      <div>
        <h1>User Profile</h1>
        <nav>

        </nav>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(UserProfile)
