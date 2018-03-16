import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import { Navbar } from './components'


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
