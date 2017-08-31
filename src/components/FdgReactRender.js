import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fake from '../fake/FdgReactRender';
import * as d3 from 'd3';

class FdgReactRender extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    linkDistance: PropTypes.number,
    forceStrength: PropTypes.number,
  };
  static defaultProps = {
    width: 600,
    height: 600,
    linkDistance: 30,
    forceStrength: -20,
  };
  constructor(props) {
    super(props);
    this.state = {
      nodes: fake.nodes,
      links: fake.links,
    };
    this.force = null;
  }
  componentDidMount() {
    this.force = d3.forceSimulation(this.state.nodes)
      .force('charge', d3.forceManyBody()
        .strength(this.props.forceStrength))
      .force('link', d3.forceLink()
        .distance(this.props.linkDistance)
        .links(this.state.links))
      .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));
    // ?????
    this.force.on('tick', () => this.setState({
      links: this.state.links,
      nodes: this.state.nodes,
    }));
  }

  componentWillUnmount() {
    this.force.stop();
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
      {this.state.links.map((link,index) => (
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          key={`line-${index}`}
          stroke="black"
        />
      ))}
      {this.state.nodes.map((node, index) => (
        <circle
          r={node.r}
          cx={node.x}
          cy={node.y}
          fill="red"
          key={`circle-${index}`}
          onClick={() => console.log(`you click index ${index}`)}
          style={{ cursor: 'pointer' }}
        />
      ))}
      {this.state.nodes.map((node, index) => (
        <text
          x={node.x}
          y={node.y}
          dx={20}
          textAnchor="middle"
          fill="orange"
          key={`text-${index}`}
        >{index}</text>
      ))}
      </svg>
    );
  }
}

export default FdgReactRender;