import React, { Component } from 'react';
import { genNodesAndLinks } from './fake/FdgReactRender';
import { clone } from 'ramda';
import * as fakeHrchyData from './fake/hierarchy';
//components
import { Switch, Link, Route } from 'react-router-dom';
import { Home, BarChart, FDG, FdgReactRender, FdgHrchy } from './components';
// element-ui
import { Layout } from 'element-react';

const { Row, Col } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    const { nodes, links } = genNodesAndLinks();
    this.state = {
      data: { nodes, links },
      hrchyData: fakeHrchyData.f2e,
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

  getFakeDataByValue = value => {
    console.log(`get new data by ${value}`);
    this.setState({
      hrchyData: fakeHrchyData[value],
    });
  }

  render() {
    return (
      <div className="app">
        <Row>
          <Col span="24">這是 Header</Col>
        </Row>
        <Row>
          <Col span="6">
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
              <li>
                <Link to="/force-directed-graph-hierarchy-data">
                  FdgHrchy
                </Link>
              </li>
            </ul>
          </Col>
          <Col span="18">
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
                <Route path="/force-directed-graph-hierarchy-data"
                  render={routerProps =>
                    <FdgHrchy
                      {...routerProps}
                      hrchyData={clone(this.state.hrchyData)}
                      getFakeDataByValue={this.getFakeDataByValue}
                    />}
                />
              </Switch>
            </div>
          </Col>
        </Row>
        <p className="App-intro">
          Please click the navbar to change the chart type
        </p>
      </div>
    );
  }
}

export default App;
