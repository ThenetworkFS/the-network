import React from 'react'
import { connect } from 'react-redux'



class MentorForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
     <div>
       <h1>Register as a Technical Mentor</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })

export default connect(mapStateToProps, null)(MentorForm)

