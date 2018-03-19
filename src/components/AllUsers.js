import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import _ from 'lodash'
import { Search, Grid, Header } from 'semantic-ui-react'


const source = [{"name": "Beth"},{"name": "Johnny"} ]




class AllUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      users:[],
      results: [],
      isLoading: false,
      value: ''
    }
    this.resetComponent = this.resetComponent.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount(){
    let currentComponent = this
    db.collection("users")
    .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges.forEach((change) => {
        if(change.type === "added"){
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

        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')

          const isMatch = result => re.test(result.title)
          console.log('did we match? ', isMatch)

          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
          console.log('re: ', re, 'results: ' , this.state.results)
        }, 500)
      }



  render() {
    const { isLoading, value, results } = this.state

    console.log('STATE: ', this.state)
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
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(AllUsers)
