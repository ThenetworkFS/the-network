import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import firebase from 'firebase'
import history from '../history'
import { connect } from 'react-redux'


class Home extends React.Component{
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    db.collection("posts").add({
      user: this.props.loggedInUser,
      content: event.target.content.value
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
    })
  }

  render(){

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={this.handleSubmit} >
        <input type="text" name="content" />
        <button type="submit"
    >Submit</button>
       </form>

    </div>
  )
}
}

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(Home)
