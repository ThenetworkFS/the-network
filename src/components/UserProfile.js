import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../store'
import { Header, Card, Icon } from 'semantic-ui-react'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'

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
      <div className="user-profile-container">
        <Card className="user-profile">
          <div></div>
          <img
            alt="user"
            src={user.image ? user.image : ANONYMOUS_USER_IMAGE_URL}
            className={!user.image ? "user-profile-image anonymous" : "user-profile-image"}
          />
          <Header className="user-profile-username" as="h2">{user.firstName} {user.lastName}</Header>
          {user.email === loggedInUser.email ? (
            <Link
              className="user-profile-edit-link"
              to={`/profile/${loggedInUser.id}/edit`}
            >
              edit profile
            </Link>
          ) : (
            null
          )}
          { user.workInfo && user.workInfo.address ? (
            <Header className="user-profile-details" as="h4">Works at {user.workInfo.address}</Header>
          ) : (
            null
          )}
          {user.city ? (
            <Header className="user-profile-details" as="h4">Lives in {user.city}, {user.state} {user.country}</Header>
          ) : (
            null
          )}
          {user.interests ? (
            <Header className="user-profile-details" as="h4">Is interested in: {user.interests}</Header>
          ) : (
            null
          )}
          {user.email ? (
            <Header className="user-profile-details" as="h4">
              <div>
                <Icon className="user-profile-icon" name="mail outline" size="large"/>
                <a className="user-profile-header" href={`mailto:${user.email}`}>{user.email}</a>
              </div>
            </Header>
          ) : (
            null
          )}
          {user.slack ? (
            <Header className="user-profile-details" as="h4">
              <div>
                <Icon className="user-profile-icon" name="slack" size="large"/>
                <a className="user-profile-header" href={user.slack}>{user.slack}</a>
              </div>
            </Header>
          ) : (
            null
          )}
          {user.github ? (
            <Header className="user-profile-details" as="h4">
              <div>
                <Icon className="user-profile-icon" name="github" size="large"/>
                <a className="user-profile-header" href={user.github} target="_blank">{user.github}</a>
              </div>
            </Header>
          ) : (
            null
          )}
          {user.linkedin ? (
            <Header className="user-profile-details" as="h4">
              <div>
                <Icon className="user-profile-icon" name="linkedin" size="large"/>
                <a className="user-profile-header" href={user.linkedin} target="_blank">{user.linkedin}</a>
              </div>
            </Header>
          ) : (
            null
          )}
          {user.projects ? (
            <h5>Projects: {user.projects.length && this.renderProjects(user.projects)}</h5>
          ) : (
            null
          )}
        </Card>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser, selectedUser } }) => ({ loggedInUser, selectedUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
