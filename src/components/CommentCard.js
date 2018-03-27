import React, { Component } from 'react'
import { Form, Button, TextArea, Card, Image, Icon } from 'semantic-ui-react'
import { db } from '../fire'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Spinner } from './'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'


class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComments: false,
      comments: [],
      newComment: '',
      loadingComments: false
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.setState({
        viewComments: false,
        comments: []
      })
    }
    if (nextProps.post !== this.props.post) {
      this.setState({
        viewComments: false,
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
        image: this.props.loggedInUser.image,
        content: this.state.newComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((doc) => {
        db.collection("posts").doc(this.props.post.id).collection("comments").doc(doc.id).update({ id: doc.id })
        this.setState({
          comments: [{
            userEmail: this.props.loggedInUser.email,
            firstName: this.props.loggedInUser.firstName,
            lastName: this.props.loggedInUser.lastName,
            image: this.props.loggedInUser.image,
            content: this.state.newComment,
            id: doc.id
          }].concat(this.state.comments)
        })
      })
  }


  toggleComments = event => {
    event.preventDefault()
    this.setState({
      loadingComments: !this.state.loadingComments,
      viewComments: !this.state.viewComments,
    })
    if (!this.state.viewComments) {
      let currentComponent = this
      db.collection("posts")
        .doc(this.props.post.id)
        .collection('comments')
        .orderBy("timestamp", "desc")
        .get()
        .then(comments => {
          let commentsArr = []
          comments.forEach((comment) => {
            commentsArr.push(comment.data())
          })
          currentComponent.setState({
            comments: commentsArr,
            loadingComments: false,
          })
        })
    }
  }


  deleteComment(event, commentId, postId) {
    event.preventDefault()
    db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(commentId)
      .delete()
      .catch(err => console.error(err))

    const filtered = this.state.comments.filter(comment => comment.id !== commentId)
    this.setState({ comments: filtered })
  }


  renderComments = () => {
    console.log('this.state.comments', this.state.comments)
    const { post } = this.props
    const user = this.props.loggedInUser
    return this.state.comments.reverse().map((comment, index) => {
      return (
        <Card className="comment-card" key={index}>
          <Card.Content>
            <Image className={comment.image ? "rounded-image" : "postcard-anonymous anonymous"} floated='left' size='mini' src={comment.image ? comment.image : ANONYMOUS_USER_IMAGE_URL} />
            <Card.Header>
              <a onClick={(event) => this.props.onUserNameClick(event, post.user)}>{comment.firstName} {comment.lastName}</a>
              {comment.userEmail === user.email ? (
                <a className="comment-card-delete-button" onClick={(event) => this.deleteComment(event, comment.id, post.id)}>
                  <Icon name="trash" /> 
                </a>
              ) : (
                null
              )}
            </Card.Header>
            <Card.Meta>
              {user.cohort}-{user.cohortId}
            </Card.Meta>
            <Card.Description>{comment.content}</Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }


  clearTextarea = () => {
    document.getElementById("new-comment-textarea").value = "";
  }


  render() {
    return (
      <div className="comment-card-container">
        <a className="comment-card-reveal-link" onClick={this.toggleComments}>
          {this.state.viewComments ? "hide comments" : "view comments"}
        </a>
        {this.state.viewComments ? (
          <div>
            {this.state.loadingComments ? (
              <Spinner size={"S"} />
            ) : (
                <div>
                  <Form
                    className="comment-card-textarea-container"
                    onSubmit={this.onAddCommentClick}
                  >
                    <TextArea
                      required
                      id="new-comment-textarea"
                      label='Comment'
                      placeholder='Comment on this post...'
                      onChange={this.handleCommentChange}
                    />
                    <Button
                      // disabled={this.state.isPostSubmitted}
                      className="feed-newpost-submit-button"
                      floated="right"
                      color="blue"
                    >
                      Comment
                  </Button>
                    <div className="comment-card-inner-container">
                      {this.renderComments()}
                    </div>
                  </Form>
                </div>
              )}
          </div>
        ) : (
            null
          )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


export default withRouter(connect(mapStateToProps, null)(CommentCard))
