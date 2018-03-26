import React from 'react'
import { db } from '../fire'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner, PostCard, PostSearch } from './'
import {
  Menu,
  Form,
  TextArea,
  Button,
} from 'semantic-ui-react'



class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      link: '',
      isPostSubmitted: false,
    }
  }


  parseLinkInContent = (content) => {
    const parseLinkExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/gi;
    const regex = new RegExp(parseLinkExpression);
    const linkInContent = content.match(regex);
    let link;
    if (linkInContent) {
      link = linkInContent[0];
    } else {
      link = '';
    }
    return link;
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isPostSubmitted: true })
    const content = event.target.content.value;
    const link = this.parseLinkInContent(content);
    const category = this.props.match.params.category;
    this.clearTextarea();
    db.collection("posts").add({
      user: this.props.loggedInUser,
      category,
      content,
      link,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((doc) => {
      console.log('doc after submit', doc.id)
      db.collection("posts").doc(doc.id).update({ id: doc.id })
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }


  clearTextarea = () => {
    document.getElementById("new-post-textarea").value = "";
  }


  render() {
    const category = this.props.match.params.category
    console.log(category)
    return (
      <div className="homepage-container">
      <PostSearch category={category}/>
        {!this.props.isFetching ? (
          <div className="feed-menu-container">
            <nav className="feed-menu">
              <Menu>
                <Menu.Item className="feed-menu-item" name='news' active={category === 'news'}>
                  <Link to="/home/news">news</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='meetup' active={category === 'meetup'}>
                  <Link to="/home/meetup">meetup</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='projects' active={category === 'projects'}>
                  <Link to="/home/projects">projects</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='jobs' active={category === 'jobs'}>
                  <Link to="/home/jobs">jobs</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='forum' active={category === 'forum'}>
                  <Link to="/home/forum">forum</Link>
                </Menu.Item>
              </Menu>
            </nav>
            <Form className="feed-newpost-textarea" onSubmit={this.handleSubmit}>
              <TextArea
                required
                id="new-post-textarea"
                placeholder='Post something'
                name="content"
                style={{ minHeight: 100 }}
              />
              <div>
                <Button
                  disabled={this.state.isPostSubmitted}
                  className="feed-newpost-submit-button"
                  floated="right"
                  color="blue"
                >
                  Post
                </Button>
              </div>
            </Form>
            { category === 'meetup' ? <Link className="calendar-link" to="/calendar">Calendar</Link>: null }
            <Posts category={category} />
          </div>
        ) : (
            <Spinner size={"L"} />
          )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })


export default connect(mapStateToProps)(Home)
