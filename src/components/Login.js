import { fire, db } from '../fire'
import React from 'react'
import { getUser } from '../store'
import { connect } from 'react-redux'
import history from '../history'
import firebase from 'firebase'
import { Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loggedInUser.email){
      history.push('/home')
    }
  }


  signInAnonymously = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    return fire.auth().signInWithEmailAndPassword(email, password)
      .then(() => history.push('/home'))
      .catch(err => console.error(err))
  }


  googleLogin = (event) => {
    event.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    fire.auth().signInWithRedirect(provider)
  }


  render() {
    return (
      <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='https://yt3.ggpht.com/a-/AJLlDp1nApHN8lojbFAL50lLxFOgBqCqtvcO1Ebl0Q=s900-mo-c-c0xffffffff-rj-k-no' />
            {' '}Log-in to your account
          </Header>
          <Form onSubmit={this.signInAnonymously} size='large'>
            <Segment stacked>
              <Form.Input
                name="email"
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
              />
              <Form.Input
                fluid
                name="password"
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='teal' fluid size='large' type='submit'>Login</Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message>
          <h6>OR</h6>
          <h6>Login with</h6>
          <Icon name='large google icon' class='large google icon' onClick={this.googleLogin} />
        </Grid.Column>
      </Grid>
    </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

export default connect(mapStateToProps)(Login)

