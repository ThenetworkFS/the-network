import React, { Component } from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { selectUser } from '../store'
import { AdvancedSearch, SearchCard } from './'
import { Button, Input } from 'semantic-ui-react'

class AllUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allUsers: [],
      searchVal: '',
      advancedSearchIsClicked: false
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

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      searchVal: event.target.value.toLowerCase()
    })
  }

  toggleAdvancedSearch = (event) => {
    event.preventDefault(event)
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
    return users.map(user => <SearchCard user={user}/>)
  }

  render() {
    const filteredUsers = this.filterUsersOnSearch()
    const { allUsers, advancedSearchIsClicked, searchVal } = this.state
    return (
      <div>
        <div className="all-users-search-container">
          <Input
            onChange={this.handleInputChange}
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search..."
            className="all-users-searchbar"
          />
          <a className="all-users-search-options" onClick={this.toggleAdvancedSearch}>{advancedSearchIsClicked ? "close" : "more search options"}</a>
          {advancedSearchIsClicked && <AdvancedSearch />}
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
