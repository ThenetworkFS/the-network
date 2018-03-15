import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}

export default App;
