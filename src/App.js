import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/header'
import Home from './components/home/home'
import Footer from './components/footer/footer'
import './normalize.css'
import './skeleton.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/">
          <div>
              <Route path="/" component={Header} />
              <Route exact path="/" component={Home} />
              <Route path="/" component={Footer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
