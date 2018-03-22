import { fire, db } from '../fire'
import React from 'react'
import { connect } from 'react-redux'
import { startFetch, stopFetch } from '../store'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'
import Spinner from './Spinner'
const uuidv1 = require('uuid/v1')



class Signup extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const id = uuidv1()
    const user = {
      email,
      firstName,
      lastName,
      id
    }
    this.props.startFetch()
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      db.collection('users')
      .doc(email)
      .set(user)
      .catch(err => console.error(err))
    })
  }

  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <div className="login-form">
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="black" textAlign="center">
                  <Image src='https://yt3.ggpht.com/a-/AJLlDp1nApHN8lojbFAL50lLxFOgBqCqtvcO1Ebl0Q=s900-mo-c-c0xffffffff-rj-k-no' />
                  {' '}The Network
                </Header>
                <Form onSubmit={this.signInAnonymously} size="large">
                  <Segment>
                    <Form.Input
                      name="firstName"
                      fluid
                      icon="user outline"
                      iconPosition="left"
                      placeholder="First Name"
                      type="text"
                      required
                    />
                    <Form.Input
                      name="lastName"
                      fluid
                      icon="user outline"
                      iconPosition="left"
                      placeholder="Last Name"
                      type="text"
                      required
                    />
                    <Form.Input
                      name="email"
                      fluid
                      icon="mail outline"
                      iconPosition="left"
                      placeholder="E-mail address"
                      type="email"
                      required
                    />
                    <Form.Input
                      fluid
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      required
                    />
                    <Button
                      className="login-form-button"
                      color="teal"
                      fluid
                      size="large"
                      type="submit"
                    >
                      Signup
                    </Button>
                  </Segment>
                </Form>
                <h5 className="login-form-prompt">
                  Already have an account? <a href="/">Sign In</a>
                </h5>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })
const mapDispatchToProps = {
  startFetch,
  stopFetch,
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup)
