import React, { Component } from 'react';
import styled from 'styled-components';
import { genNodesAndLinks } from './fake/FdgReactRender';
import { clone } from 'ramda';
import * as fakeHrchyData from './fake/hierarchy';
//components
import { Switch, Link, Route } from 'react-router-dom';
import { Home, BarChart, FDG, FdgReactRender, FdgHrchy } from './components';
// element-ui
import { Layout, Menu } from 'element-react';
import * as swatch from 'constants/swatch';

const { Row, Col } = Layout;

const AppContainer = styled.div`
  .app-header {
    height: 40px;
    color: ${swatch.White};
    background-color: ${swatch.LightBlack};
  }

  .side-menu {
    min-width: 200px;

    a {
      text-decoration: none;
    }

    .el-menu-item {
      padding-left: 16px;
    }
  }

  .content {
    text-align: center;
  }
`;

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
      <AppContainer>
        <Row className="app-header">
          <Col span="24">這是 Header</Col>
        </Row>
        <Row>
          <Col span="4">
            <Menu mode="vertical" className="side-menu">
              <Link to="/">
                <Menu.Item index="home">Home</Menu.Item>
              </Link>
              <Menu.ItemGroup title="Chart">
                <Link to="/bar-chart">
                  <Menu.Item index="bar-chart">BarChart</Menu.Item>
                </Link>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Graph">
                <Link to="/force-directed-graph">
                  <Menu.Item index="fdg">Force-Directed Graph</Menu.Item>
                </Link>
                <Link to="/force-directed-graph-react-render">
                  <Menu.Item index="fdg-rc">FdgReactRender</Menu.Item>
                </Link>
                <Link to="/force-directed-graph-hierarchy-data">
                  <Menu.Item index="fdg-hrchy">FdgHrchy</Menu.Item>
                </Link>
              </Menu.ItemGroup>
            </Menu>
          </Col>
          <Col span="20">
            <div className="content">
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
      </AppContainer>
    );
  }
}

export default App;
