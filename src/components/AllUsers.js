import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'


// const source = this.state.users;

// [{"title": "Beth", description: 'A cool person', price: 999999 },{"title": "Johnny", description: 'Another coolio', price: 2.50 } ]


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
        // async call / dispatch / similar

        // ({ image, price, title, description }) => [
        //   image && <div key='image' className='image'>{createHTMLImage(image)}</div>,
        //   <div key='content' className='content'>
        //     {price && <div className='price'>{price}</div>}
        //     {title && <div className='title'>{title}</div>}
        //     {description && <div className='description'>{description}</div>}
        //   </div>,
        // ]

          if (value.length < 1) return this.resetComponent()

          const re = new RegExp(_.escapeRegExp(value), 'i')

          const isMatch = result => re.test(result.title)
          // console.log('did we match? ', isMatch)

          this.setState({
            isLoading: false,
            results: _.filter(this.state.users, isMatch),
          })
          // console.log('re: ', re, 'results: ' , this.state.results)
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
          <pre>{JSON.stringify(this.state.users, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

export default connect(mapStateToProps)(AllUsers)
