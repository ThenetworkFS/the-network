import { fire } from '../fire'
import React from 'react'
import { startFetch } from '../store'
import { connect } from 'react-redux'
import firebase from 'firebase'
import {
  Button,
  Icon,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'
import Spinner from './Spinner'


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      invalidLogin: false
    }
  }

  loginAsGuest = (event) => {
    event.preventDefault()
    this.props.startFetch()
    console.log('in the login func"')
    const email = "guest@guest.com"
    const password = "guest123"
    fire.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({
          invalidLogin: true
        })
        console.error(err)
      })
  }

  signInAnonymously = (event) => {
    event.preventDefault()
    this.props.startFetch()
    const email = event.target.email.value
    const password = event.target.password.value
    fire.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({
          invalidLogin: true
        })
        console.error(err)
      })
  }


  googleLogin = (event) => {
    event.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    localStorage.setItem('googleLogin', '1');
    fire.auth()
      .signInWithRedirect(provider)
      .catch(() => {
        localStorage.removeItem('googleLogin');
      })
  }


  setInvalidToFalse = (event) => {
    event.preventDefault()
    this.setState({
      invalidLogin: false
    })
  }


  render() {
    return (
      <div className="login-form-container">
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
                  {this.state.invalidLogin && <h5>Invalid User or Password</h5>}
                  <Segment>
                    <Form.Input
                      onChange={this.setInvalidToFalse}
                      name="email"
                      fluid
                      icon="mail outline"
                      iconPosition="left"
                      placeholder="E-mail address"
                      type="email"
                      required
                    />
                    <Form.Input
                      onChange={this.setInvalidToFalse}
                      fluid
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      required
                    />
                    <Button className="login-form-button" color="teal" fluid size="large" type="submit">Login</Button>
                  </Segment>
                </Form>
                <h5 className="login-form-prompt">
                  Don't have an account? <a href="/signup">Sign Up Now</a>
                </h5>
                <h4>OR</h4>
                <Button className="google-login-button" color="blue" size="small" onClick={this.googleLogin}>
                  <span>Login with</span>
                  <Icon name="google" className="large google icon google-login-icon" />
                </Button>
                <h4 className="not-fs">Not a Fullstack Grad?</h4>
                <Button className="not-fs-btn" color="blue" size="small" onClick={this.loginAsGuest}> Continue as Guest
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
            <Spinner size={"L"} />
          )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }, isFetching }) => ({ loggedInUser, isFetching })


const mapDispatchToProps = {
  startFetch,
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)

