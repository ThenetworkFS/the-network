import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import { getUser } from '../store'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault()
    const email = this.props.loggedInUser.email
    const getUser = this.props.getUser
    const editedUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      city: event.target.city.value,
      state: event.target.state.value,
      country: event.target.country.value,
      interests: event.target.interests.value,
      slack: event.target.slack.value,
      github: event.target.github.value,
      linkedin: event.target.linkedin.value,
      // projects: event.target.projects.value
    }
    db.collection('users').doc(email).set(editedUser)
      .then(() => {
        getUser(editedUser)
        history.push('/profile')
      })
      .catch(err => console.error(err))
  }

  render() {
    const user = this.props.loggedInUser;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h6><input name="firstName" defaultValue={user.firstName} /> <input name="lastName" defaultValue={user.lastName} /></h6>
          <h6>Lives in <input name="city" placeholder="City" defaultValue={user.city} />, <input name="state" placeholder="State" defaultValue={user.state} /> <input name="country" placeholder="Country" defaultValue={user.country} /></h6>
          <h6>Is interested in: <input name="interests" defaultValue={user.interests} /></h6>
          <h6>Email: <input name="email" defaultValue={user.email} /></h6>
          <h6>Slack: <input name="slack" defaultValue={user.slack} /></h6>
          <h6>Github: <input name="github" defaultValue={user.github} /></h6>
          <h6>Linkedin: <input name="linkedin" defaultValue={user.linkedin} /></h6>
          <h5>Projects:</h5>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

// {user.projects && user.projects.map((project,index) => {
//   return (
//     <div key={index}>
//       <h6>Title: <input name="title" defaultValue={project.title} /></h6>
//       <h6>Description: <input name="description" defaultValue={project.description} /></h6>
//     </div>
//   )
// })
// }

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => {
    dispatch(getUser(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
