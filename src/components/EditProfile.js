import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import ImagePicker from './ImagePicker'
import history from '../history'
import { getUser } from '../store' 
import EditWork from './EditWork'
import EditProject from './EditProject'


class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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


  handleProfileSubmit = (event) => {
    event.preventDefault()
    const user = this.props.loggedInUser
    db
      .collection('users')
      .doc(user.email)
      .update(this.state.loggedInUser)
      .then(() => {
        history.push(`/profile/${user.id}`)
      })
      .catch(err => console.error(err))
  }


  handleChange = event => {
    event.preventDefault()
    console.log(event.target.name, event.target.value)
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        [event.target.name]: event.target.value,
      },
    })
  }


  noop = () => { }


  render() {
    const user = this.state.loggedInUser
    return (
      <div>
        <form
          onSubmit={this.handleProfileSubmit}
          onChange={this.handleChange}
        >
          <h6>
            <input
              onChange={this.noop}
              name="firstName"
              value={user.firstName}
            />{' '}
            <input
              onChange={this.noop}
              name="lastName"
              value={user.lastName}
            />
          </h6>
          <ImagePicker />
          <h6>
            Lives in{' '}
            <input
              onChange={this.noop}
              name="city"
              placeholder="City"
              value={user.city}
            />,{' '}
            <input
              onChange={this.noop}
              name="state"
              placeholder="State"
              value={user.state}
            />{' '}
            <input
              onChange={this.noop}
              name="country"
              placeholder="Country"
              value={user.country}
            />
          </h6>
            Is interested in:{' '}
            <input
              onChange={this.noop}
              name="interests"
              value={user.interests}
            />
          <h6>
            Slack:{' '}
            <input
              onChange={this.noop}
              name="slack"
              value={user.slack}
            />
          </h6>
          <h6>
            Github:{' '}
            <input
              onChange={this.noop}
              name="github"
              value={user.github}
            />
          </h6>
          <h6>
            Linkedin:{' '}
            <input
              onChange={this.noop}
              name="linkedin"
              value={user.linkedin}
            />
          </h6>
          <button type="submit">Save Profile</button>
        </form>
        <EditWork />
        <EditProject />
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
