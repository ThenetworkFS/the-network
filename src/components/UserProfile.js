import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../store'


class UserProfile extends React.Component {
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
        <h6>Works at: {user.workInfo.address}</h6>
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
