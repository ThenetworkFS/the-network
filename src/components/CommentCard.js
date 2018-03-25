import React, { Component } from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { db } from '../fire'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComments: false,
      comments: [],
      newComment: '',
      loadingComments: true
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.category !== this.props.match.params.category){
      this.setState({
        viewComments:false,
        comments:[]
      })
    }
  }

  handleCommentChange = (e, { value }) => this.setState({ newComment: value })

  onAddCommentClick = (event) => {
    event.preventDefault()
    this.clearTextarea();
    db.collection('posts')
    .doc(this.props.post.id)
    .collection('comments')
    .add({
      userEmail: this.props.loggedInUser.email,
      firstName: this.props.loggedInUser.firstName,
      lastName: this.props.loggedInUser.lastName,
      content: this.state.newComment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    this.setState({
      comments: [{
        userEmail: this.props.loggedInUser.email,
        firstName: this.props.loggedInUser.firstName,
        lastName: this.props.loggedInUser.lastName,
        content: this.state.newComment
      }].concat(this.state.comments)
    })
  }

  onHideCommentsClick = event => {
    event.preventDefault()
    this.setState({
      viewComments: false,
      loadingComments: true
    })
  }

  onViewCommentsClick = event => {
    event.preventDefault()
    this.setState({
      loadingComments: true,
      viewComments: true,
    })
    let currentComponent = this
    db.collection("posts")
    .doc(this.props.post.id)
    .collection('comments')
    .orderBy("timestamp", "desc")
    .get()
    .then(comments => {
      let commentsArr = []
      comments.forEach((comment)=> {
        commentsArr.push(comment.data())
      })
      currentComponent.setState({
        comments: commentsArr,
        loadingComments: false,
      })
    })
  }

  renderComments = () => {
    return this.state.comments.map((comment, index) => {
      return (
        <div key={index}>
          <h1>{comment.firstName} {comment.lastName} </h1>
          <h2>{comment.content}</h2>
        </div>
      )
    })
  }

  clearTextarea = () => {
    document.getElementById("new-comment-textarea").value = "";
  }

  render() {
    return (
      <div>
      {this.state.viewComments ? (
        <div>
          {this.state.loadingComments ? (
            <h1>loading</h1>
          ) : (
            <div>
              <Button onClick={this.onHideCommentsClick}>
                Hide Comments
              </Button>
              <Form 
                className="new-comment-textarea"
                onSubmit={this.onAddCommentClick}
              >
                <TextArea
                  required
                  id="new-comment-textarea"
                  label='Comment'
                  placeholder='Add Comment...'
                  onChange={this.handleCommentChange}
                />
                <Button type="submit">
                  Add Comment
                </Button>
                {this.renderComments()}
              </Form>
            </div>
          )}
        </div>
      ) : (
        <Button onClick={this.onViewCommentsClick}>
          View Comments
        </Button>
      )}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })

export default withRouter(connect(mapStateToProps, null)(CommentCard))
