import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { removeUser } from '../store'
import { fire, db } from '../fire'
import history from '../history'
import { connect } from 'react-redux'
import { Icon, Menu } from 'semantic-ui-react'


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { activeItem: 'home' }
  }


  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    history.push(`/${name}`)
  }


  render() {
    const { activeItem } = this.state
    const user = this.props.loggedInUser
    return (
      <div>
        <nav>
          {user && user.email ? (
            <div>
              <Menu icon>
                <Menu.Item name='The Network' />
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                  <Icon name='browser' />
                </Menu.Item>

                <Menu.Item name='allUsers' active={activeItem === 'allUsers'} onClick={this.handleItemClick}>
                  <Icon name='users' />
                </Menu.Item>

                <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
                  <Icon name='user' />
                </Menu.Item>
                <button onClick={this.props.removeUser}>
                  Sign out
                </button>
              </Menu>
            </div>
          ) : (
              <div>
                <Link to="/">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
        </nav>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => {
    fire.auth().signOut()
    dispatch(removeUser())
    history.push('/')
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
