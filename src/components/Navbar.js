import React, { Component } from 'react'
import { removeUser, selectUser } from '../store'
import { fire } from '../fire'
import history from '../history'
import { connect } from 'react-redux'
import { Icon, Menu, Image } from 'semantic-ui-react'
import { FULLSTACK_LOGO_URL } from '../constants';


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { activeItem: 'home/news' }
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
        <div className="navbar-mobile">
            {user && user.email ? (
              <nav>
                <Menu>
                  <Image className="logo" floated='left' size='mini' src={FULLSTACK_LOGO_URL} />
                  <Menu.Item className="navbar-button-mobile border-left" name='home/news' active={activeItem === 'home/news'} onClick={this.handleItemClick}>
                    <Icon name='browser' />
                  </Menu.Item>

                  <Menu.Item className="navbar-button-mobile" name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
                    <Icon name='users' />
                  </Menu.Item>

                  <Menu.Item className="navbar-button-mobile" name={`profile/${user.id}`} active={activeItem === `profile/${user.id}`}
                    onClick={(event, name) => {
                      this.handleItemClick(event, name)
                      this.props.selectUser(user)
                    }
                    }>
                    <Icon name='user' />
                  </Menu.Item>
                  <a className="signout-button" onClick={this.props.removeUser}>
                    <Icon name='sign out' />
                  </a>
                </Menu>
              </nav>
            ) : (
              null
            )}
        </div>
        <div className="navbar-desktop-container">
          {user && user.email ? (
            <nav>
              <Menu className="navbar-desktop">
                <Image className="logo" floated='left' size='mini' src={FULLSTACK_LOGO_URL} />
                <div className="navbar-buttons">
                  <Menu.Item className="navbar-button" name='home/news' active={activeItem === 'home/news'} onClick={this.handleItemClick}>
                    News Feed
                  </Menu.Item>

                  <Menu.Item className="navbar-button" name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
                    Alumni
                  </Menu.Item>

                  <Menu.Item className="navbar-button" name={`profile/${user.id}`} active={activeItem === `profile/${user.id}`}
                    onClick={(event, name) => {
                      this.handleItemClick(event, name)
                      this.props.selectUser(user)
                    }}
                  >
                    My Profile
                  </Menu.Item>
                </div>
                <a className="signout-button" onClick={this.props.removeUser}>sign out</a>
              </Menu>
            </nav>
          ) : (
            null
          )}
      </div>
    </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => {
    fire.auth().signOut()
    dispatch(removeUser())
    history.push('/')
  },
  selectUser: (user) => {
    dispatch(selectUser(user))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
