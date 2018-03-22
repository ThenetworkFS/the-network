import React from 'react'
import { db } from '../fire'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import PostCard from './PostCard'
import { Menu, Form, TextArea } from 'semantic-ui-react'


class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      link: '',
    }
  }

  componentDidMount() {
    let currentComponent = this
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
    const content = event.target.content.value;
    const link = this.parseLinkInContent(content);
    const category= this.props.match.params.category
    db.collection("posts").add({
      user: this.props.loggedInUser,
      category,
      content,
      link,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    })
  }

  renderPostCards = (category) => {
    return this.state.posts.filter(post => post.category === category).map((post, index) => {
      return (
        <PostCard key={index} post={post}/>
      )
    })
  }

  render() {
    const category= this.props.match.params.category
    return (
      <div className="homepage-container">
        {!this.props.isFetching ? (
          <div className="feed-menu-container">
            <nav className="feed-menu">
              <Menu>
                <Menu.Item className="feed-menu-item" name='home/news'>
                  <Link to="/home/news">news</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='home/meetup'>
                  <Link to="/home/meetup">meetup</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='home/projects'>
                  <Link to="/home/projects">projects</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='home/jobs'>
                  <Link to="/home/jobs">jobs</Link>
                </Menu.Item>

                <Menu.Item className="feed-menu-item" name='home/faq'>
                  <Link to="/home/faq">faq</Link>
                </Menu.Item>
              </Menu>
            </nav>
            <Form className="feed-newpost-textarea" onSubmit={this.handleSubmit}>
              <TextArea placeholder='Post something' name="content" style={{ minHeight: 100 }} />
              <button type="submit">Post</button>
            </Form>
            {this.renderPostCards(category)}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })

export default connect(mapStateToProps)(Home)
