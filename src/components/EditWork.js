import React from 'react'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import { getUser } from '../store'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class EditWork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addIsClicked: false,
      editIsClicked: false,
      address: ''
    }
    this.onChange = (address) => this.setState({ address })
  }


  // handleFormSubmit = (event) => {
  //   event.preventDefault()

  //   geocodeByAddress(this.state.address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error))
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser !== this.state.loggedInUser) {
      this.setState(() => ({
        loggedInUser: nextProps.loggedInUser,
      }))
    }
  }


  handleWorkSubmit = (event) => {
    event.preventDefault()
    this.setState({addIsClicked: false, editIsClicked: false})
    const user = this.props.loggedInUser

    geocodeByAddress(this.state.address)
    .then(results => getLatLng(results[0]))
    .then(result => {
      const updated = { workInfo: {
        address: this.state.address,
        coordinates: result
      }}
      db
      .collection('users')
      .doc(user.email)
      .update(updated)
      .catch(err => console.error(err))
    })
    .catch(error => console.error('Error', error))
  }


  onDeleteClick = (event) => {
    event.preventDefault()
    const email= this.props.loggedInUser.email
    const editedUser = {
      workInfo: '',
    }
    db
      .collection('users')
      .doc(email)
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


  render() {
    const user = this.props.loggedInUser
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    return (
      <div>
        <h6>Works at</h6>
        {user.workInfo && !this.state.editIsClicked ?
          <div>
          <h6>{user.workInfo.address}</h6>
            <button onClick={this.editIsClicked}>Edit</button>
            <button onClick={this.onDeleteClick}>Remove</button>
          </div>
          :
          null
        }
        {user.workInfo ? null : <button onClick={this.addIsClicked}>Add Work</button>}
        {this.state.addIsClicked || this.state.editIsClicked ?

          <form onSubmit={this.handleWorkSubmit}>
          <PlacesAutocomplete inputProps={inputProps} />
          <button type="submit">Submit</button>
        </form>
          : null
        }
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(EditWork)
