import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../store'

const ANONYMOUS_USER_IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/thenetwork-8d967.appspot.com/o/userImages%2Fanon_user.svg?alt=media&token=feef4a3d-7e4b-4ca9-8624-572882cda7fd"

class UserProfile extends React.Component {
  componentDidMount() {
  }

  renderProjects = (projects) => {
    return projects.map(project => {
      return (
        <div key={project.id}>
          <h6>Title: {project.title}</h6>
          <h6>Description: {project.description}</h6>
        </div>
      )
    })
  }

  render() {
    const user = this.props.selectedUser;
    const loggedInUser = this.props.loggedInUser;
    return (
      <div>
        <img alt="user" src={user.image ? user.image : ANONYMOUS_USER_IMAGE_URL} className={!user.image ? "user-profile-image anonymous" : "user-profile-image"} />
        <h1>{user.firstName} {user.lastName}</h1>
        {user.email === loggedInUser.email ?
          <Link to={`/profile/${loggedInUser.id}/edit`}>Edit Profile</Link>
          : null
        }
        <h6>Lives in {user.city}, {user.state} {user.country}</h6>
        <h6>Is interested in: {user.interests}</h6>
        <h6>Email: {user.email}</h6>
        <h6>Slack: {user.slack}</h6>
        <h6>Github: {user.github}</h6>
        <h6>Linkedin: {user.linkedin}</h6>
        { user.workInfo ?
        <h6>Works at: {user.workInfo.address}</h6>
        : null
        }
        {user.projects ?
          <h5>Projects: {user.projects.length && this.renderProjects(user.projects)}</h5>
          : null
        }
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser, selectedUser } }) => ({ loggedInUser, selectedUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
