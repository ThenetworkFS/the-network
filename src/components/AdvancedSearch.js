import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import history from '../history'
import { Search, Grid, Header } from 'semantic-ui-react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      cohortValue: '',
      cohortNumValue: ''
    }
    this.submitHandler = this.submitHandler.bind(this)

  }

  componentWillMount() {
  }

  componentDidMount() {
    let currentComponent = this
  }
  submitHandler(event){
    event.preventDefault()
    console.log('STATE', this.state)
  }

  handleCohortChange = (e, { value }) => this.setState({ cohortValue: value })

  handleCohortNumChange = (e, { value }) => this.setState({ cohortNumValue: value })

  handleCityChange = (e, { value }) => this.setState({ city: value })

  handleCompanyChange = (e, { value }) => this.setState({ company: value })

  handleIndustryChange = (e, { value }) => this.setState({ industry: value })


  render() {

    console.log('STATE: ', this.state)
    const options = [
      { key: 'GH', text: 'GH', value: 'GH' },
      { key: 'FS', text: 'FS', value: 'FS' },
    ]


    return (
      <div>
        <h1> Advanced Search: </h1>
        <Form
          onSubmit={this.submitHandler}>

            <Form.Field
              width='1'
              onChange={this.handleCohortChange}
              control={Select}
              label='cohort'
              options={options}
              placeholder='Cohort' />
            <Form.Input
              label='number'
              placeholder='Number'
              onChange={this.handleCohortNumChange}
              width='1'
            />
            <Form.Input
              label='city'
              placeholder='City'
              onChange={this.handleCityChange}
              width='1'
            />
            <Form.Input
              label='company'
              placeholder='Company'
              onChange={this.handleCompanyChange}
              width='1'
            />
            <Form.Input
              label='industry'
              placeholder='Industry'
              onChange={this.handleIndustryChange}
              width='1'
            />



          <Button
          type='submit'>Submit</Button>

      </Form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({ loggedInUser: state.user.loggedInUser })

// export default connect(mapStateToProps)(AdvancedSearch)
