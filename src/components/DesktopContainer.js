import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import HomepageHeading from './HomepageHeading'


class DesktopContainer extends Component {
  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { children } = this.props
    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility>
          <Segment className="landing-header-container" inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}


DesktopContainer.propTypes = {
  children: PropTypes.node,
}


export default DesktopContainer