import React from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { getUser } from '../store'
const uuidv1 = require('uuid/v1')


class EditProject extends React.Component {
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


  handleProjectSubmit = (event, id) => {
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


  addProject = (event) => {
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



  noop = () => { }


  render() {
    const user = this.state.loggedInUser
    return (
      <div>
        <h5>Projects:</h5>
        {this.state.addIsClicked ? (
          <div>
            <form onSubmit={this.addProject}>
              <h6>
                Title:{' '}
                <input
                  required
                  onChange={this.noop} name="title" />
              </h6>
              <h6>
                Description:{' '}
                <input
                  required
                  onChange={this.noop}
                  name="description"
                />
              </h6>
              <button type="submit">Add Project</button>
            </form>
          </div>
        ) : (
            <button onClick={this.addIsClicked}>Add New Project</button>
          )}
        {user.projects &&
          user.projects.map(project => {
            return this.state.editIsClicked &&
              this.state.editId === project.id ? (
                <div key={project.id}>
                  <form
                    onSubmit={event =>
                      this.handleProjectSubmit(
                        event,
                        project.id,
                      )
                    }
                  >
                    <h6>
                      Title:{' '}
                      <input
                        name="title"
                        defaultValue={project.title}
                      />
                    </h6>
                    <h6>
                      Description:{' '}
                      <input
                        name="description"
                        defaultValue={project.description}
                      />
                    </h6>
                    <button type="submit">Save</button>
                  </form>
                </div>
              ) : (
                <div key={project.id}>
                  <h6>Title: {project.title}</h6>
                  <h6>Description: {project.description}</h6>
                  <button
                    onClick={event =>
                      this.editIsClicked(event, project.id)
                    }
                  >
                    Edit
                                </button>
                  <button
                    onClick={event =>
                      this.onDeleteClick(event, project.id)
                    }
                  >
                    Delete
                                </button>
                </div>
              )
          })}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProject)
