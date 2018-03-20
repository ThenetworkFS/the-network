import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import ImagePicker from './ImagePicker'
import history from '../history'
import { getUser } from '../store'
const uuidv1 = require('uuid/v1');


class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addIsClicked: false,
      editIsClicked: false,
      editId: ''
    }
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this)
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    this.addProject = this.addProject.bind(this)
    this.addIsClicked = this.addIsClicked.bind(this)
    this.editIsClicked = this.editIsClicked.bind(this)
  }


  handleProfileSubmit(event) {
    event.preventDefault()
    const email = this.props.loggedInUser.email
    const editedUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      city: event.target.city.value,
      state: event.target.state.value,
      country: event.target.country.value,
      interests: event.target.interests.value,
      slack: event.target.slack.value,
      github: event.target.github.value,
      linkedin: event.target.linkedin.value,
    }
    db.collection('users').doc(email).update(editedUser)
      .then(() => {
        history.push('/profile')
      })
      .catch(err => console.error(err))
  }


  handleProjectSubmit(event, id) {
    event.preventDefault()
    this.setState({
      editIsClicked: false
    })
    const userProjects = this.props.loggedInUser.projects
    let array = userProjects.filter(project => project.id !== id)
    const editedProject = {
      id: id,
      title: event.target.title.value,
      description: event.target.description.value
    }
    array.push(editedProject)
    const editedUser = {
      projects: array
    }
    db.collection('users').doc(this.props.loggedInUser.email).update(editedUser)
  }


  addIsClicked(event) {
    event.preventDefault()
    this.setState({ addIsClicked: true })
  }


  editIsClicked(event, id) {
    event.preventDefault()
    this.setState({ editIsClicked: true, editId: id })
  }


  onDeleteClick(event, id) {
    event.preventDefault()
    const newProjects = this.props.loggedInUser.projects.filter(project => project.id !== id)
    const editedUser = {
      projects: newProjects
    }
    db.collection('users').doc(this.props.loggedInUser.email).update(editedUser)
  }


  addProject(event) {
    event.preventDefault()
    const email = this.props.loggedInUser.email
    const id = uuidv1()
    const projects = this.props.loggedInUser.projects || [];
    this.setState({ addIsClicked: false })
    projects.push({ id: id, title: event.target.title.value, description: event.target.description.value })
    const editedUser = {
      projects
    }
    db.collection('users').doc(email).update(editedUser)
      .catch(err => console.error(err))
  }


  render() {
    const user = this.props.loggedInUser;
    return (
      <div>
        <form onSubmit={this.handleProfileSubmit}>
          <h6><input name="firstName" defaultValue={user.firstName} /> <input name="lastName" defaultValue={user.lastName} /></h6>
          <ImagePicker />
          <h6>Lives in <input name="city" placeholder="City" defaultValue={user.city} />, <input name="state" placeholder="State" defaultValue={user.state} /> <input name="country" placeholder="Country" defaultValue={user.country} /></h6>
          <h6>Is interested in: <input name="interests" defaultValue={user.interests} /></h6>
          <h6>Slack: <input name="slack" defaultValue={user.slack} /></h6>
          <h6>Github: <input name="github" defaultValue={user.github} /></h6>
          <h6>Linkedin: <input name="linkedin" defaultValue={user.linkedin} /></h6>
          <button type="submit">Save Profile</button>
        </form>
        <h5>Projects:</h5>
        {this.state.addIsClicked ?
          <div>
            <form onSubmit={this.addProject}>
              <h6>Title: <input name="title" /></h6>
              <h6>Description: <input name="description" /></h6>
              <button type="submit">Add Project</button>
            </form>
          </div>
          :
          <button onClick={this.addIsClicked}>Add New Project</button>
        }
        {
          user.projects && user.projects.map((project) => {
            return (
              this.state.editIsClicked && this.state.editId === project.id ?
                <div key={project.id}>
                  <form onSubmit={(event) => this.handleProjectSubmit(event, project.id)}>
                    <h6>Title: <input name="title" defaultValue={project.title} /></h6>
                    <h6>Description: <input name="description" defaultValue={project.description} /></h6>
                    <button type="submit">Save</button>
                  </form>
                </div>
                :
                <div key={project.id}>
                  <h6>Title: {project.title}</h6>
                  <h6>Description: {project.description}</h6>
                  <button onClick={(event) => this.editIsClicked(event, project.id)}>Edit</button>
                  <button onClick={(event) => this.onDeleteClick(event, project.id)}>Delete</button>
                </div>
            )
          })
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })


const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => {
    dispatch(getUser(user))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

