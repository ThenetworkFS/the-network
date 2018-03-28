import React from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { getUser } from '../store'
import { ProjectForm, ProjectCard } from './'
import { Icon } from 'semantic-ui-react'
const uuidv1 = require('uuid/v1')


class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addIsClicked: false,
      editIsClicked: false,
      editId: '',
      loggedInUser: props.loggedInUser,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser !== this.state.loggedInUser) {
      this.setState(() => ({
        loggedInUser: nextProps.loggedInUser,
      }))
    }
  }

  onEditProjectSubmit = (event, id) => {
    event.preventDefault()
    this.setState({
      editIsClicked: false,
    })
    const userProjects = this.props.loggedInUser.projects
    let array = userProjects.filter(project => project.id !== id)
    const editedProject = {
      id: id,
      title: event.target.title.value,
      description: event.target.description.value,
    }
    array.push(editedProject)
    const editedUser = {
      projects: array,
    }
    db
      .collection('users')
      .doc(this.props.loggedInUser.email)
      .update(editedUser)
  }

  addIsClicked = (event) => {
    event.preventDefault()
    this.setState({ addIsClicked: true })
  }

  editIsClicked = (event, id) => {
    event.preventDefault()
    this.setState({ editIsClicked: true, editId: id })
  }


  onDeleteClick = (event, id) => {
    event.preventDefault()
    const newProjects = this.props.loggedInUser.projects.filter(
      project => project.id !== id,
    )
    const editedUser = {
      projects: newProjects,
    }
    db
      .collection('users')
      .doc(this.props.loggedInUser.email)
      .update(editedUser)
  }


  onAddProjectSubmit = (event) => {
    event.preventDefault()
    const email = this.props.loggedInUser.email
    const id = uuidv1()
    const projects = this.props.loggedInUser.projects || []
    this.setState({ addIsClicked: false })
    projects.push({
      id: id,
      title: event.target.title.value,
      description: event.target.description.value,
    })
    const editedUser = {
      projects,
    }
    db
      .collection('users')
      .doc(email)
      .update(editedUser)
      .catch(err => console.error(err))
  }

  renderUserProjects = (userProjects) => {
    const { editIsClicked, editId } = this.state
    return userProjects.map(project => {
      if (editIsClicked && editId === project.id) {
        return (
          <div key={project.id}>
            <ProjectForm
              isEditing={true}
              title={project.title}
              description={project.description}
              onSubmit={(evt) => this.onEditProjectSubmit(evt, project.id)}
            />
          </div>
        )
      } else {
        return (
          <div key={project.id}>
            <ProjectCard
              isEditing={true}
              title={project.title}
              description={project.description}
              onEditClick={(evt) => this.editIsClicked(evt, project.id)}
              onDeleteClick={(evt) => this.onDeleteClick(evt, project.id)}
            />
          </div>
        )
      }
    })
  }

  render() {
    const user = this.state.loggedInUser
    return (
      <div>
        <label>Projects</label>
        {this.state.addIsClicked ? (
          <ProjectForm
            isEditing={false}
            onSubmit={this.onAddProjectSubmit}
          />
        ) : (
          <a className="add-project-link" onClick={this.addIsClicked}>
            <Icon name="add square" />
            <span>add project</span>
          </a>
        )}
        {user.projects ? (
          <div>
            {this.renderUserProjects(user.projects)}
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
