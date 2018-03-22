import React, { Component } from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'


class AllUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      results: [],
      isLoading: false,
      value: ''
    }
  }


  componentWillMount() {
    this.resetComponent()
  }


  componentDidMount() {
    let currentComponent = this
    db.collection("users")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              users: currentComponent.state.users.concat(change.doc.data())
            });
          }
        });
      })
  }


  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })


  handleResultSelect = (e, { result }) => this.setState({ value: result.title })


  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    if (value.length < 1) return this.resetComponent()
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)

    this.setState({
      isLoading: false,
      results: _.filter(this.state.users, isMatch),
    })
  }


  render() {
    const { isLoading, value, results } = this.state
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(this.state.users, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


export default connect(mapStateToProps)(AllUsers)
