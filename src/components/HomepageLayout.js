import React from 'react'
import { connect } from 'react-redux'
import { startFetch } from '../store'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner'
import ResponsiveContainer from './ResponsiveContainer'


class HomepageLayout extends React.Component {
  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <ResponsiveContainer>
            <Segment style={{ padding: '8em 0em' }} vertical>
              <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as='h3' style={{ fontSize: '2em' }}>Get Answers to Your Questions</Header>
                    <p style={{ fontSize: '1.33em' }}>
                      The job search can be hard, but we are here to help. By joining The Network, you are able to ask any question regarding company specific interviews, culture, or anything else that is on your mind.
            </p>
                    <Header as='h3' style={{ fontSize: '2em' }}>Get Mentorship</Header>
                    <p style={{ fontSize: '1.33em' }}>
                      We have partnered with the Career Success team to help provide guidance by connecting Fullstack graduates with a mentor.
            </p>
                  </Grid.Column>
                  <Grid.Column floated='right' width={6}>
                    <Image
                      bordered
                      rounded
                      size='large'
                      src='https://files.keepingcurrentmatters.com/wp-content/uploads/2013/11/07192835/Helping-Eachother-up-Cliff.jpg'
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign='center'>
                    <Button as='a' size='large' href="/map">See Where We Work</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment style={{ padding: '0em' }} vertical>
              <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>"The Network was a huge help during my job search. They helped me connect to my current manager who is a Fullstack grad!"</Header>
                    <p style={{ fontSize: '1.33em' }}>
                      <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg' />
                      <b>Steve</b> Software Engineer at Google
            </p>
                  </Grid.Column>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>"I am not sure what I would have done without The Network. They made connecting to Fullstack alumni fun and easy."</Header>
                    <p style={{ fontSize: '1.33em' }}>
                      <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg' />
                      <b>Jenny</b> Systems Architect at Amazon
            </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment style={{ padding: '8em 0em', textAlign: 'center' }} vertical>
              <Container text>
                <Header as='h3' style={{ fontSize: '2em', textAlign: 'center' }}>We Are More Than a Coding School, We Are a Community.</Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
                  Stay connected to the community You help build.
        </p>
                <Button as='a' size='large' href='/login'>Join Us</Button>

              </Container>
            </Segment>
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
              <Container>
                <Grid divided inverted stackable>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Header inverted as='h4' content='Contact Us' />
                      <List link inverted>
                        <List.Item>5 Hanover Square</List.Item>
                        <List.Item>New York, NY 10004</List.Item>
                        <List.Item as='a' href="mailto:thenetworkFS@gmail.com">Email</List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Header inverted as='h4' content='About' />
                      <List link inverted>
                        <List.Item as='a' href='https://www.fullstackacademy.com/' rel='noopener noreferrer' target='_blank'>Fullstack Academy</List.Item>
                        <List.Item as='a' href='https://www.fullstackacademy.com/faq' rel='noopener noreferrer' target='_blank'>FAQ</List.Item>
                        <List.Item as='a' href='https://www.fullstackacademy.com/careers' rel='noopener noreferrer' target='_blank'>Careers</List.Item>
                        <List.Item as='a' href=''>Mentorship Program</List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <Header as='h4' inverted>Find Us On:</Header>
                      <List>
                        <a href='https://www.linkedin.com/school/fullstack-academy/' rel='noopener noreferrer' target='_blank'>
                          <Icon name='linkedin' size='huge' />
                        </a>
                        <a href='https://github.com/FullstackAcademy' rel='noopener noreferrer' target='_blank'>
                          <Icon name='github' size='huge' />
                        </a>
                        <a href='https://www.facebook.com/FullstackAcademy/' rel='noopener noreferrer' target='_blank'>
                          <Icon name='facebook' size='huge' />
                        </a>
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </ResponsiveContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(HomepageLayout)
