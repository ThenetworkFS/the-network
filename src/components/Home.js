import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import firebase from 'firebase'
import history from '../history'
import { connect } from 'react-redux'


class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    let currentComponent = this

    //THIS IS GETTING THE STATE INTIALLY
    //   db.collection("posts").get().then(function(querySnapshot) {
    //     querySnapshot.forEach((doc)=>{
    //         currentComponent.setState({
    //           posts: currentComponent.state.posts.concat(doc.data())
    //         })
    //     });
    // });

    //THIS IS LISTENING FOR CHANGES IN DB AND ADDING TO STATE
    //ordering by most recent on first render, but not when adding new
    db.collection("posts").orderBy("timestamp", "desc")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              posts: currentComponent.state.posts.concat(change.doc.data())
            });
          }
        });
      })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    db.collection("posts").add({
      user: this.props.loggedInUser,
      content: event.target.content.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }


  render() {
    return (
      <div>
        <h1>Home</h1>
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="content" />
          <button
            type="submit">
            Submit
          </button>
        </form>
        {this.state.posts.map((post, index) => {
          return (
            <div key={index}>
              <h1> {post.user.firstName} {post.user.lastName} </h1>
              <h2> {post.content} </h2>
              <br></br>
            </div>
          )
        })}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

export default connect(mapStateToProps)(Home)
