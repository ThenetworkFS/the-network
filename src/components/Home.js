import React from 'react'
// import { Link } from 'react-router-dom'
import { db } from '../fire'
import firebase from 'firebase'
// import history from '../history'
import { connect } from 'react-redux'
import MicrolinkCard from 'react-microlink'
import Spinner from './Spinner'
// import { selectUser } from '../store'
import PostCard from './PostCard'


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
    const parseLinkExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
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


  // formatPostWithLink = (post) => {
  //   const linkIndex = post.content.indexOf(post.link)
  //   const linkLength = post.link.length
  //   const contentFirstPart = post.content.slice(0, linkIndex);
  //   const contentSecondPart = post.content.slice(linkIndex + linkLength);
  //   return (
  //     <span>
  //       {contentFirstPart}
  //       <a href={post.link} target="_blank">{post.link}</a>
  //       {contentSecondPart}
  //     </span>
  //   )
  // }


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


  // handleUserClick = (event, user) => {
  //   event.preventDefault()
  //   return db.collection('users')
  //     .doc(user.email)
  //     .get()
  //     .then(user => {
  //       this.props.selectUser(user.data())
  //       history.push(`/profile/${user.data().id}`)
  //     })
  // }


  render() {
    const category= this.props.match.params.category
    return (
      <div>
        {!this.props.isFetching ? (
          <div>
          <nav>
          <Link to="/home/news"> news </Link>
          <Link to="/home/meetup"> meetup </Link>
          <Link to="/home/projects"> projects </Link>
          <Link to="/home/jobs"> jobs </Link>
          <Link to="/home/faq"> FAQ </Link>
          </nav>
            <form onSubmit={this.handleSubmit} >
              <input type="text" name="content" />
              <button type="submit">Submit</button>
            </form>
            {this.state.posts.filter(post => post.category === category).map((post, index) => {
              return (
                <PostCard post={post}/>
              )
            })}
            {/* {this.state.posts.map((post, index) => {
              return (
                <div key={index}>
                <button onClick={(event) => this.handleUserClick(event, post.user)}>{post.user.firstName} {post.user.lastName}</button>
                  {post.link ? (
                    <div>
                      {this.formatPostWithLink(post)}
                      <MicrolinkCard
                        round
                        url={post.link}
                        target='_blank'
                      />
                    </div>
                  ) : (
                    <span>{post.content}</span>
                  )}
                  <br></br>
                </div>
              )
            })} */}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}

//news, meetup, jobs, projects, faq

const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })


// const mapDispatchToProps = {
//   selectUser
// }


export default connect(mapStateToProps)(Home)
