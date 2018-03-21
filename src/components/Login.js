import { fire, db } from '../fire'
import React from 'react'
import { startFetch } from '../store'
import { connect } from 'react-redux'
import history from '../history'
import firebase from 'firebase'
import { Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  signInAnonymously = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    fire.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err))
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
                <Header as="h2" color="teal" textAlign="center">
                  <Image src='https://yt3.ggpht.com/a-/AJLlDp1nApHN8lojbFAL50lLxFOgBqCqtvcO1Ebl0Q=s900-mo-c-c0xffffffff-rj-k-no' />
                  {' '}Log-in to your account
                </Header>
                <Form onSubmit={this.signInAnonymously} size="large">
                  <Segment>
                    <Form.Input
                      name="email"
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                    />
                    <Form.Input
                      fluid
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                    <Button color="teal" fluid size="large" type="submit">Login</Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href="/signup">Sign Up</a>
                </Message>
                <h4>OR</h4>
                <Button color="teal" size="small" type="submit">
                  {`Login with `}
                  <Icon name="google" className="large google icon" onClick={this.googleLogin} />
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <div>Fetching</div>
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

