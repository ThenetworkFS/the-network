import React from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import ImagePicker from './ImagePicker'
import history from '../history'
import { getUser } from '../store'
import { Projects } from './'
import { Card, Form, Input, Button, Select } from 'semantic-ui-react'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: props.loggedInUser,
      isProfileSaved: false,
      address: '',
      // isWorkAdressEdited is necessary to get coordinates from googleMap API
      isWorkAdressEdited: false,
      isUserDetailsEdited: false,
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser !== this.state.loggedInUser) {
      this.setState(() => ({
        loggedInUser: nextProps.loggedInUser,
      }))
    }
  }


  componentDidMount() {
    if (this.props.loggedInUser.email) {
      if (this.props.loggedInUser.workInfo) {
        this.setState(() => ({
          address: this.props.loggedInUser.workInfo.address,
        }))
      }
    }
  }


  handleProfileSubmit = (event) => {
    event.preventDefault()
    this.setState({ isProfileSaved: true })
    if (
      this.state.isWorkAdressEdited &&
      !this.state.isUserDetailsEdited
    ) {
      this.getGeoCodeByAddress()
        .then(result => {
          const userWorkInfo = {
            company: this.state.loggedInUser.company,
            workInfo: {
              address: this.state.address,
              coordinates: result
            }
          }
          this.updateUser(userWorkInfo)
        })
    } else if (
      this.state.isWorkAdressEdited &&
      this.state.isUserDetailsEdited
    ) {
      this.getGeoCodeByAddress()
        .then(result => {
          this.setState(
            {
              loggedInUser: {
                ...this.state.loggedInUser,
                workInfo: { ...this.state.workInfo, coordinates: result }
              }
            },
            this.updateUser(this.state.loggedInUser)
          )
        })
    } else {
      this.updateUser(this.state.loggedInUser)
    }
  }


  getGeoCodeByAddress = () => {
    return geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
  }


  updateUser = (userAttributes) => {
    db
      .collection('users')
      .doc(this.state.loggedInUser.email)
      .update(userAttributes)
      .then(() => {
        history.push(`/profile/${this.state.loggedInUser.id}`)
      })
      .catch(err => console.error(err))
  }


  onInputChange = event => {
    event.preventDefault()
    this.setState({
      isUserDetailsEdited: true,
      loggedInUser: {
        ...this.state.loggedInUser,
        [event.target.name]: event.target.value,
      },
    })
  }

  onDropChange = (event, param) => {
    event.preventDefault()
    this.setState({
      isUserDetailsEdited: true,
      loggedInUser: {
        ...this.state.loggedInUser,
        [param.name]: param.value,
      }
    })
  }


  onWorkAddressChange = (address) => {
    const company = address.split(',')[0].toLowerCase()
    this.setState({
      isWorkAdressEdited: true,
      address,
      loggedInUser: {
        ...this.state.loggedInUser,
        workInfo: { ...this.state.workInfo, address },
        company: company
      }
    })
  }


  render() {
    const user = this.state.loggedInUser
    const inputProps = {
      value: this.state.address,
      onChange: this.onWorkAddressChange,
    }
    const options = [
      { key: 'GH', text: 'GH', value: 'gh' },
      { key: 'FS', text: 'FS', value: 'fs' },
    ]
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
          <Form onSubmit={this.handleProfileSubmit}>
            <div className="user-profile-username edit-profile">
              <Form.Field>
                <label className="label">First name</label>
                <Input
                  type='text'
                  onChange={this.onInputChange}
                  name="firstName"
                  value={user.firstName}
                />
                <label className="label">Last name</label>
                <Input
                  type="text"
                  onChange={this.onInputChange}
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
                  onChange={this.onInputChange}
                  name="city"
                  value={user.city}
                />
                <select name="state" id="state"
                onChange={this.onInputChange}>
                  <option value="" selected="selected">State</option>
                  <option value="al">Alabama</option>
                  <option value="ak">Alaska</option>
                  <option value="az">Arizona</option>
                  <option value="ar">Arkansas</option>
                  <option value="ca">California</option>
                  <option value="co">Colorado</option>
                  <option value="ct">Connecticut</option>
                  <option value="de">Delaware</option>
                  <option value="dc">District Of Columbia</option>
                  <option value="fl">Florida</option>
                  <option value="ga">Georgia</option>
                  <option value="hi">Hawaii</option>
                  <option value="id">Idaho</option>
                  <option value="il">Illinois</option>
                  <option value="in">Indiana</option>
                  <option value="ia">Iowa</option>
                  <option value="ks">Kansas</option>
                  <option value="ky">Kentucky</option>
                  <option value="la">Louisiana</option>
                  <option value="me">Maine</option>
                  <option value="md">Maryland</option>
                  <option value="ma">Massachusetts</option>
                  <option value="mi">Michigan</option>
                  <option value="mn">Minnesota</option>
                  <option value="ms">Mississippi</option>
                  <option value="mo">Missouri</option>
                  <option value="mt">Montana</option>
                  <option value="ne">Nebraska</option>
                  <option value="nv">Nevada</option>
                  <option value="nh">New Hampshire</option>
                  <option value="nj">New Jersey</option>
                  <option value="nm">New Mexico</option>
                  <option value="ny">New York</option>
                  <option value="nc">North Carolina</option>
                  <option value="nd">North Dakota</option>
                  <option value="oh">Ohio</option>
                  <option value="ok">Oklahoma</option>
                  <option value="or">Oregon</option>
                  <option value="pa">Pennsylvania</option>
                  <option value="ri">Rhode Island</option>
                  <option value="sc">South Carolina</option>
                  <option value="sd">South Dakota</option>
                  <option value="tn">Tennessee</option>
                  <option value="tx">Texas</option>
                  <option value="ut">Utah</option>
                  <option value="vt">Vermont</option>
                  <option value="va">Virginia</option>
                  <option value="wa">Washington</option>
                  <option value="wv">West Virginia</option>
                  <option value="wi">Wisconsin</option>
                  <option value="wy">Wyoming</option>
                </select>
                <label className="label">Country</label>
                <Input
                  type="text"
                  onChange={this.onInputChange}
                  name="country"
                  value={user.country}
                />
                <div className="cohort-search-container">
                  <Form.Field
                    onChange={this.onDropChange}
                    control={Select}
                    label='Cohort'
                    options={options}
                    placeholder='Cohort'
                    className='cohort label'
                    name="cohort"
                  />
                  <Form.Input
                    label='Number'
                    placeholder='Number'
                    onChange={this.onInputChange}
                    className='cohort-id label'
                    name="cohortId"
                  />
                </div>
                <label className="label">Your interests</label>
                <Input
                  type="text"
                  onChange={this.onInputChange}
                  name="interests"
                  value={user.interests}
                />
                <label className="label">Github</label>
                <Input
                  type="text"
                  onChange={this.onInputChange}
                  name="github"
                  value={user.github}
                />
                <label className="label">LinkedIn</label>
                <Input
                  type="text"
                  onChange={this.onInputChange}
                  name="linkedin"
                  value={user.linkedin}
                />
              </Form.Field>
              <label className="label">Company</label>
              <PlacesAutocomplete inputProps={inputProps} />
            </div>
            <Button
              disabled={this.state.isProfileSaved}
              className="user-profile-save-button"
              color="blue"
            >
              Save Profile
            </Button>
          </Form>
          <Projects />
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



// <label className="label">State</label>
//                 <Input
//                   type="text"
//                   onChange={this.onInputChange}
//                   name="state"
//                   value={user.state}
//                 />