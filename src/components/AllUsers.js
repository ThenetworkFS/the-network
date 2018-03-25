import React, { Component } from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { selectUser } from '../store'
import { AdvancedSearch, SearchCard } from './'
import { Button, Input } from 'semantic-ui-react'
import history from '../history'


class AllUsers extends Component {
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
          allUsers,
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
        query = users.where("city", "==", params.get("city"))
      }
      if (params.has("company")) {
        query = users.where("company", "==", params.get("company"))
      }

      query.get()
      .then(function(users){
        let filteredUsers = [];
        users.forEach(user => {
          filteredUsers.push(user.data());
        })
        currentComponent.setState({
          allUsers: filteredUsers,
        })
      })
    }
  }

  submitHandler = (event) => {
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
    this.setState({ [param.name]: param.value })
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
    return users.map(user => <SearchCard key={user.id} user={user}/>)
  }

  render() {
    let filteredUsers;
    if (this.state.searchVal) {
      filteredUsers = this.filterUsersOnSearch()
    }
    const { allUsers, advancedSearchIsClicked, searchVal } = this.state
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
          <a
            className="all-users-search-options"
            onClick={this.toggleAdvancedSearch}
          >
            {advancedSearchIsClicked ? "close" : "more search options"}
          </a>
          {advancedSearchIsClicked && <AdvancedSearch onInputChange={this.onInputChange} onSubmit={this.submitHandler}/>}
          <div className="all-users-results">
            {searchVal ? (
              this.renderSearchCards(filteredUsers)
            ) : (
              this.renderSearchCards(allUsers)
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  selectUser
}

export default connect(null, mapDispatchToProps)(AllUsers)
