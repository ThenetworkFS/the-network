import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startFetch } from '../store'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner'


const HomepageHeading = ({ mobile }) => (

    <Container text>
  
      <Header
        as='h1'
        content='The Network'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='We help you stay connected.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button className='mouse-cursor-gradient-tracking' primary size='huge' href='/login'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  }

  export default HomepageHeading