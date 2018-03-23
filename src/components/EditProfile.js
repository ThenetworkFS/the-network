import React from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import ImagePicker from './ImagePicker'
import history from '../history'
import { getUser } from '../store' 
import EditWork from './EditWork'
import EditProject from './EditProject'
import { Card, Form, Input, Button } from 'semantic-ui-react'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: props.loggedInUser,
      isProfileSaved: false,
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
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        [event.target.name]: event.target.value,
      },
      isProfileSaved: true,
    })
  }


  noop = () => { }


  render() {
    const user = this.state.loggedInUser
    return (
      <div className="user-profile-container">
        <Card className="user-profile">
          <div></div>
          <img
            alt="user"
            src={user.image ? user.image : ANONYMOUS_USER_IMAGE_URL}
            className={!user.image ? "user-profile-image anonymous" : "user-profile-image"}
          />
          <ImagePicker />
          <Form
            onSubmit={this.handleProfileSubmit}
            onChange={this.handleChange}
          >
            <div className="user-profile-username edit-profile">
              <Form.Field>
                <label className="label">First name</label>
                <Input
                  type='text'
                  onChange={this.noop}
                  name="firstName"
                  value={user.firstName}
                />
                <label className="label">Last name</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="lastName"
                  value={user.lastName}
                />
              </Form.Field>
            </div>
            <div>
              <Form.Field>
                <label className="label">City</label>
                <Input
                  type='text'
                  onChange={this.noop}
                  name="city"
                  value={user.city}
                />
                <label className="label">State</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="state"
                  value={user.state}
                />
                <label className="label">Country</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="country"
                  value={user.country}
                />
                <label className="label">Your interests</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="interests"
                  value={user.interests}
                />
                <label className="label">Slack</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="slack"
                  value={user.slack}
                />
                <label className="label">Github</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="github"
                  value={user.github}
                />
                <label className="label">LinkedIn</label>
                <Input
                  type="text"
                  onChange={this.noop}
                  name="linkedin"
                  value={user.linkedin}
                />
              </Form.Field>
            </div>
            <Button 
              disabled={this.state.isProfileSaved}
              className="user-profile-save-button"
              color="blue"
            >
              Save Profile
            </Button>
          </Form>
          <EditWork />
          <EditProject />
        </Card>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
