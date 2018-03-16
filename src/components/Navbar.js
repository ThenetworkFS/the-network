import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'


export default class Navbar extends Component {

  state = { activeItem: 'browser' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu icon>
        <Menu.Item name='The Network' >

          </Menu.Item>
          <Menu.Item name='browser' active={activeItem === 'browser'} onClick={this.handleItemClick}>
            <Icon name='browser' />
          </Menu.Item>

          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
            <Icon name='users' />
          </Menu.Item>

          <Link to="/home">
          <Menu.Item name='user' active={activeItem === 'user'} onClick={this.handleItemClick}>
            <Icon name='user' />
          </Menu.Item>
          </Link>
        </Menu>
        <nav>

          <Link to="/home">Home</Link>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/">Sign out</Link>
        </nav>
      </div>
    )
  }
}
