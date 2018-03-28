import React, { Component } from 'react'
import { Form, Button, TextArea, Card, Image, Icon } from 'semantic-ui-react'
import { db } from '../fire'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Spinner } from './'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'
import Highlight from 'react-highlight'

class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComments: false,
      comments: [],
      newComment: '',
      loadingComments: false,
      isCode: false
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
        code: this.state.isCode,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((doc) => {
        db.collection("posts").doc(this.props.post.id).collection("comments").doc(doc.id).update({ id: doc.id })
        this.setState({
          comments: 
            this.state.comments.concat([{
            userEmail: this.props.loggedInUser.email,
            firstName: this.props.loggedInUser.firstName,
            lastName: this.props.loggedInUser.lastName,
            image: this.props.loggedInUser.image,
            content: this.state.newComment,
            id: doc.id,
            code: this.state.isCode
          }]),
          isCode: false
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
        .orderBy("timestamp", "asc")
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
    const { post } = this.props
    const user = this.props.loggedInUser
    return this.state.comments.map((comment, index) => {
      return (
        <Card className="comment-card" key={index}>
          <Card.Content>
            <Image className={comment.image ? "rounded-image" : "postcard-anonymous anonymous"} floated='left' size='mini' src={comment.image ? comment.image : ANONYMOUS_USER_IMAGE_URL} />
            <Card.Header>
              <a className="comment-card-username" onClick={(event) => this.props.onUserNameClick(event, post.user)}>{comment.firstName} {comment.lastName}</a>
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
            {comment.code ?
              <Highlight className="javascript">
                {comment.content}
              </Highlight>
              :
              <Card.Description>{comment.content}</Card.Description>
            }
          </Card.Content>
        </Card>
      )
    })
  }


  clearTextarea = () => {
    document.getElementById("new-comment-textarea").value = "";
  }

  code = (event) => {
    event.preventDefault()
    this.setState({ isCode: !this.state.isCode })
  }


  render() {
    const category = this.props.match.params.category
    const code = this.state.isCode
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
                    {category === "forum" ?
                      <div>
                        <Icon onClick={this.code} name="code" className={code ? "code" : "disabled code icon"} size="large" />
                        <span>Add Code Snippet</span>
                      </div>
                      : null}
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
