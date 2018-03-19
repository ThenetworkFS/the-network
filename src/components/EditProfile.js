import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import ImagePicker from './ImagePicker'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  renderProjects(projects){
    return projects.map(project => {
      return (
        <div>
          <h6>Title: {project.title}</h6>
          <h6>Description: {project.description}</h6>
        </div>
      )
    })
  }

  render() {
    const user= this.props.loggedInUser;
    return (
      <div>
        <h1>{user.firstName} {user.lastName}</h1>
        <ImagePicker />
        <h6>Lives in {user.city}, {user.state}</h6>
        <h6>Is interested in: {user.interests && user.interests.join(', ')}</h6>
        <h6>Email: {user.email}</h6>
        <h6>Slack: {user.slack}</h6>
        <h6>Github: {user.github}</h6>
        <h6>Linkedin: {user.linkedIn}</h6>
        <h5>Projects: {user.projects && this.renderProjects(user.projects)}</h5>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(EditProfile)
