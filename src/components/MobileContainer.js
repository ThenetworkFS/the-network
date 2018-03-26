import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import HomepageHeading from './HomepageHeading'


class MobileContainer extends Component {
  state = {}

  
  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }


  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })


  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
          <Segment className="landing-header-container" inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
            <HomepageHeading mobile />
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}


MobileContainer.propTypes = {
  children: PropTypes.node,
}


export default MobileContainer