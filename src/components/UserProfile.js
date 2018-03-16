import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'


class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  //   db.collection("users").add({
  //     first: "John",
  //     last: "Dude",
  //     born: 1500
  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });
  render() {
    console.log('loggedInUser', this.props.loggedInUser)
    return (
      <div>
        <h1>User Profile</h1>
        <nav>

        </nav>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })


export default connect(mapStateToProps)(UserProfile)

