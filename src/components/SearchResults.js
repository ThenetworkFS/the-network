import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import { withRouter } from 'react-router'
import queryString from 'query-string';
import { Button } from 'semantic-ui-react'
import AdvancedSearch from './AdvancedSearch';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectUser } from '../store'
import history from '../history'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usersResults: [],
    }
  }

  componentWillMount() {
  }


  componentDidMount() {
    let currentComponent = this

    const params = queryString.parseUrl(this.props.location.search)

    let ref = db.collection("users")
    let query = ref

    if (params.query.cohortNum !== "") {
      query = query.where("cohortNum", "==", params.query.cohortNum)
   }
    if (params.query.cohort !== "") {
       query = query.where("cohort", "==", params.query.cohort)
    }
    if (params.query.city !== "") {
       query = query.where("city", "==", params.query.city)
    }
    if (params.query.company !== "") {
       query = query.where("company", "==", params.query.company)
    }
    if (params.query.industry !== "") {
      query = query.where("industry", "==", params.query.industry)
   }

    query.get()
    .then(function(users){
      users.forEach((user)=>{
        currentComponent.setState({
          usersResults: currentComponent.state.usersResults.concat(user.data())
        })
      })
    })
  }

  onUserNameClick = (event, user) => {
    event.preventDefault()
    return db.collection('users')
      .doc(user.email)
      .get()
      .then(user => {
        this.props.selectUser(user.data())
        history.push(`/profile/${user.data().id}`)
      })
  }

  render() {
    return (
      <div>
        <Link to='/advancedSearch'>
        <Button>Back to Search</Button>
        </Link>
       <h1>Search Results</h1>
       {this.state.usersResults.map((user) => {
          return (
            <div>
              <Card>
                {/* <Image src='./download.jpg' /> */}
                <Card.Content>
                  <Card.Header>
                  <a onClick={(event) => this.onUserNameClick(event, user)}>{user.firstName} {user.lastName}</a>
                  </Card.Header>
                  <Card.Meta>{user.cohort} {user.cohortNum}</Card.Meta>
                  <Card.Description>{user.firstName} lives in {user.city} and works at {user.company}.</Card.Description>
                </Card.Content>
            </Card>
          </div>
          )
        })
       }
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

// export default connect(mapStateToProps)(AdvancedSearch)

const mapDispatchToProps = {
  selectUser
}

// const connected =

export default withRouter(connect(null, mapDispatchToProps)(SearchResults))
