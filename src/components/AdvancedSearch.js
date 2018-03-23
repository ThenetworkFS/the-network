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
      cohortNumValue: '',
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
              users: currentComponent.state.users.concat(change.doc.data())
            });
          }
        });
      })
  }

  submitHandler = (event) => {
    event.preventDefault()
    history.push(`/search?cohort=${this.state.cohortValue}&cohortNum=${this.state.cohortNumValue}&city=${this.state.city}&company=${this.state.company}&industry=${this.state.industry}`)

  }

  handleCohortChange = (e, { value }) => this.setState({ cohortValue: value })

  handleCohortNumChange = (e, { value }) => this.setState({ cohortNumValue: value })

  handleCityChange = (e, { value }) => this.setState({ city: value })

  handleCompanyChange = (e, { value }) => this.setState({ company: value })

  handleIndustryChange = (e, { value }) => this.setState({ industry: value })


  render() {


    const options = [
      { key: 'GH', text: 'GH', value: 'GH' },
      { key: 'FS', text: 'FS', value: 'FS' },
    ]


    return (
      <div>
        <Form
          onSubmit={this.submitHandler}>

            <Form.Field
              width='1'
              onChange={this.handleCohortChange}
              control={Select}
              label='Cohort'
              options={options}
              placeholder='Cohort' />
            <Form.Input
              label='Number'
              placeholder='Number'
              onChange={this.handleCohortNumChange}
              width='1'
            />
            <Form.Input
              label='City'
              placeholder='City'
              onChange={this.handleCityChange}
              width='1'
            />
            <Form.Input
              label='Company'
              placeholder='Company'
              onChange={this.handleCompanyChange}
              width='1'
            />
            <Form.Input
              label='Industry'
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
