import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import history from '../history'
import { withRouter } from 'react-router'
import queryString from 'query-string';
import { Button } from 'semantic-ui-react'
import AdvancedSearch from './AdvancedSearch';
import { Card, Icon, Image } from 'semantic-ui-react'

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
    const search = params.query.industry
    // console.log('HERE:', search.length)

    db.collection("users")
    // .where("industry", "==", `${params.query.industry}`)
    // .where("cohortNum", "==", "")
    // .where("city", "==", "")
    // .where("company", "==", "")
    .where("industry", "==", `${params.query.industry}`) //works with Tech!!!!
    .get()
    .then(function(users){
      users.forEach((user)=>{
        currentComponent.setState({
          usersResults: currentComponent.state.usersResults.concat(user.data())
        })
      })
    })
  }

  render() {
console.log('PROPS', this.props)
console.log('STATE ON SEARCH RES: ', this.state)
const params = queryString.parse(this.props.location.search)
console.log('PARAMS-query', params)

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
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
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

export default withRouter(SearchResults)
