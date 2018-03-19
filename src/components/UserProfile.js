import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'


class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  renderProjects(projects){
    if(projects[0].title){
    return projects.map(project => {
      return (
        <div>
          <h6>Title: {project.title}</h6>
          <h6>Description: {project.description}</h6>
        </div>
      )
    })
  }
  }

  render() {
    const user= this.props.loggedInUser;
    return (
      <div>
        <h1>{user.firstName} {user.lastName}</h1>
        <Link to='/profile/edit'>Edit Profile</Link>
        <h6>Lives in {user.city}, {user.state} {user.country}</h6>
        <h6>Is interested in: {user.interests}</h6>
        <h6>Email: {user.email}</h6>
        <h6>Slack: {user.slack}</h6>
        <h6>Github: {user.github}</h6>
        <h6>Linkedin: {user.linkedin}</h6>
        <h5>Projects: {user.projects && this.renderProjects(user.projects)}</h5>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(UserProfile)
