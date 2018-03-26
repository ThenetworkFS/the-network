import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { db } from '../fire'
import history from '../history'
import { selectUser } from '../store'
import { connect } from 'react-redux'
import { ANONYMOUS_USER_IMAGE_URL } from '../constants'


class SearchCard extends Component {


  onUserNameClick = (event, user) => {
    event.preventDefault()
    db.collection('users')
      .doc(user.email)
      .get()
      .then(user => {
        this.props.selectUser(user.data())
        history.push(`/profile/${user.data().id}`)
      })
  }


  render() {
    const user = this.props.user
    return (
      <div className="searchcard-container">
        <Card className="searchcard">
          <Card.Content>
            <div className="searchcard-content-container">
              <Image className={user.image ? "searchcard-image" : "searchcard-image searchcard-anonymous"} floated='left' size='mini' src={user.image ? user.image : ANONYMOUS_USER_IMAGE_URL} />
              <div className="searchcard-content">
                <Card.Header>
                  <a onClick={(event) => this.onUserNameClick(event, user)}>{user.firstName} {user.lastName}</a>
                </Card.Header>
                <Card.Meta>
                  FS - 1801
                </Card.Meta>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }
}


const mapDispatchToProps = {
  selectUser
}


export default connect(null, mapDispatchToProps)(SearchCard)


// const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

// export default connect(mapStateToProps)(SearchCard)


{/* <Card className="postcard">
  <Card.Content>
    <Image floated='left' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg' />
    <Card.Header>
      <a onClick={(event) => this.onUserNameClick(event, post.user)}>{post.user.firstName} {post.user.lastName}</a>
    </Card.Header>
    <Card.Meta>
      FS - 1801
    </Card.Meta>
  </Card.Content>
</Card> */}