import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//components
import { Switch, Link, Route } from 'react-router-dom';
import { Home, BarChart } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Please click the navbar to change the chart type
        </p>
        <ul className="navbar">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bar-chart">
              BarChart
            </Link>
          </li>
        </ul>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/bar-chart" component={BarChart} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
