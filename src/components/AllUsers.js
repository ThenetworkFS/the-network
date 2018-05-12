import React, { Component } from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { selectUser } from '../store'
import { AdvancedSearch, SearchCard } from './'
import { Input } from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom'


export class AllUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allUsers: [],
      searchVal: '',
      advancedSearchIsClicked: false,
      cohort: '',
      cohortId: '',
      city: '',
      company: '',
      industry: ''
    }
  }


  componentDidMount() {
    let currentComponent = this
    db.collection("users")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              allUsers: currentComponent.state.allUsers.concat(change.doc.data())
            });
          }
        });
      })
  }


  componentWillReceiveProps(nextProps) {
    let currentComponent = this
    let users = db.collection("users")
    if (nextProps.location.search === '') {
      users.get()
        .then(users => {
          let allUsers = [];
          users.forEach(user => {
            allUsers.push(user.data());
          })
          currentComponent.setState({
            allUsers: allUsers
          })
        })
    }
    if (
      this.props.location.search !== nextProps.location.search &&
      nextProps.location.search !== ''
    ) {
      const params = new URLSearchParams(nextProps.location.search)
      let query;

      if (params.has("cohort")) {
        query = users.where("cohort", "==", params.get("cohort"))
      }
      if (params.has("cohortId")) {
        query = users.where("cohortId", "==", params.get("cohortId"))
      }
      if (params.has("city")) {
        query = users.where("cityLower", "==", params.get("city"))
      }
      if (params.has("company")) {
        query = users.where("companyLower", "==", params.get("company"))
      }

      query
      .get()
      .then(function (users) {
        let filteredUsers = [];
        users.forEach(user => {
          filteredUsers.push(user.data());
        })
        currentComponent.setState({
          allUsers: filteredUsers
        })
      })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (
      this.state.cohort ||
      this.state.cohortId ||
      this.state.city ||
      this.state.company ||
      this.state.industry
    ) {
      let searchResultsUrl = '/users?';
      let queryParams = []
      if (this.state.cohort) {
        queryParams.push(`cohort=${this.state.cohort}`);
      }
      if (this.state.cohortId) {
        queryParams.push(`cohortId=${this.state.cohortId}`);
      }
      if (this.state.city) {
        queryParams.push(`city=${this.state.city}`);
      }
      if (this.state.company) {
        queryParams.push(`company=${this.state.company}`);
      }
      const queryParamsString = queryParams.join('&');
      searchResultsUrl += queryParamsString;
      history.push(searchResultsUrl);
    }
  }


  onInputChange = (evt, param) => {
    evt.preventDefault()
    this.setState({ [param.name]: param.value.toLowerCase() })
  }


  toggleAdvancedSearch = (event) => {
    event.preventDefault(event)
    if (this.state.advancedSearchIsClicked) {
      history.push('/users')
    }
    this.setState({
      advancedSearchIsClicked: !this.state.advancedSearchIsClicked
    })
  }


  filterUsersOnSearch = () => {
    const searchValue = this.state.searchVal;
    return this.state.allUsers.filter((user) => {
      return user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue)
    })
  }


  renderSearchCards = (users) => {
    return users.map(user => <SearchCard key={user.id} user={user} />)
  }


  render() {
    console.log('STATE', this.state)
    console.log('ALL USERS PROPS', this.props)
    let filteredUsers;
    if (this.state.searchVal) {
      filteredUsers = this.filterUsersOnSearch()
    }
    const allUsers= this.state.allUsers.filter(user => user.id !== this.props.loggedInUser.id)
    const { advancedSearchIsClicked, searchVal } = this.state
    return (
      <div>
        <div className="all-users-search-container">
          <Input
            onChange={this.onInputChange}
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search..."
            className="all-users-searchbar"
            name="searchVal"
          />
          <div className="alumni-buttons">
            <Link className="alumni-map-link" to="/map">alumni map</Link>
            <a
              className="all-users-search-options"
              onClick={this.toggleAdvancedSearch}
            >
              {advancedSearchIsClicked ? "close" : "search options"}
            </a>
          </div>
          {advancedSearchIsClicked && <AdvancedSearch onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>}
        </div>
        <div className="all-users-results">
          {searchVal ? (
            this.renderSearchCards(filteredUsers)
          ) : (
            this.renderSearchCards(allUsers)
          )}
        </div>
        <SearchCard key = {1} user = {{firstName: "Jane", id: 1}}/>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


const mapDispatchToProps = {
  selectUser
}


export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
