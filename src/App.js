import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { genNodesAndLinks } from './fake/FdgReactRender';
import { clone } from 'ramda';
//components
import { Switch, Link, Route } from 'react-router-dom';
import { Home, BarChart, FDG, FdgReactRender } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    const { nodes, links } = genNodesAndLinks();
    this.state = {
      data: { nodes, links },
    };
  }

  genData = () => {
    const { nodes, links } = genNodesAndLinks();
    this.setState({
      data: { nodes, links },
    });
  }

  appendData = () => {
    const { nodes, links } = genNodesAndLinks(2);
    const { data } = this.state;
    this.setState({
      data: {
        nodes: [...data.nodes, ...nodes],
        links: [...data.links, ...links],
      },
    });
  }

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
          <li>
            <Link to="/force-directed-graph">
              Force-Directed Graph
            </Link>
          </li>
          <li>
            <Link to="/force-directed-graph-react-render">
              FdgReactRender
            </Link>
          </li>
        </ul>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/bar-chart" component={BarChart} />
            <Route path="/force-directed-graph" component={FDG} />
            <Route path="/force-directed-graph-react-render"
              render={routerProps =>
                <FdgReactRender
                  {...routerProps}
                  genData={this.genData}
                  appendData={this.appendData}
                  nodes={clone(this.state.data.nodes)}
                  links={clone(this.state.data.links)}
                />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
