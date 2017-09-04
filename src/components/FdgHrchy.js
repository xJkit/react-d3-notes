import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { flattenHrchyToNodes, flattenHrchyToLinks, appendNodes, appendLinks } from '../utils/hierarchy';

class FdgHrchy extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    linkDistance: PropTypes.number,
    forceStrength: PropTypes.number,
    hrchyData: PropTypes.object.isRequired,
    getFakeDataByValue: PropTypes.func.isRequired,
  };
  static defaultProps = {
    width: 600,
    height: 600,
    linkDistance: 100,
    forceStrength: -20,
  };
  constructor(props) {
    super(props);
    // nodes and links are deeply copied to the props from the parent component states
    this.state = {
      nodes: flattenHrchyToNodes(props.hrchyData),
      links: flattenHrchyToLinks(props.hrchyData),
    };
    this.force = null;
    this.isUpdateData = false;
  }
  componentDidMount() {
    console.log(this.state);
    this.renderGraph();
  }

  componentWillReceiveProps({ hrchyData }) {
    const newNodes = flattenHrchyToNodes(hrchyData);
    const newLinks = flattenHrchyToLinks(hrchyData);
    this.setState({
      nodes: appendNodes(this.state.nodes, newNodes),
      links: appendLinks(this.state.links, newLinks),
    });
    this.isUpdateData = true;
  }

  componentDidUpdate() {
    if (this.isUpdateData) {
      this.isUpdateData = false;
      this.renderGraph();
    }
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    this.force.stop();
  }

  onNodeClickByValue = value => () => {
    const { links, nodes } = this.state;
    const linkSources = links.map(link => link.source.value);
    const clickedNodeStatus = nodes.filter(node => node.value === value);
    // debugger;
    if (clickedNodeStatus[0].isLeaf) {
      alert(`leaf node ${value} does not have sub branches`);
    } else if (linkSources.indexOf(value) === -1) {
      // clicked node is not parent node
      this.props.getFakeDataByValue(value);
    } else {
      console.warn(`you clicked ${value} which is a parent node`);
    }
  }

  renderGraph = () => {
    this.force = d3.forceSimulation(this.state.nodes)
    .force('charge', d3.forceManyBody()
      .strength(this.props.forceStrength))
    .force('link', d3.forceLink()
      .distance(this.props.linkDistance)
      .links(this.state.links)
      .id(d => d.value))
    .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));
  // force-update the views
    this.force.on('tick', () => this.setState({
      links: this.state.links,
      nodes: this.state.nodes,
    }));
  }

  render() {
    return (
      <div>
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
            stroke="grey"
          />
        ))}
        {this.state.nodes.map((node, index) => (
          <circle
            r={20}
            cx={node.x}
            cy={node.y}
            fill={node.isLeaf ? 'steelblue' : 'orange'}
            key={`circle-${index}`}
            onClick={this.onNodeClickByValue(node.value)}
            style={{ cursor: 'pointer', strokeWidth: '1px', stroke: '#000' }}
          />
        ))}
        {this.state.nodes.map((node, index) => (
          <text
            x={node.x}
            y={node.y}
            dx={50}
            textAnchor="middle"
            fill="#000"
            key={`text-${index}`}
          >
          {node.name}
          </text>
        ))}
        </svg>
      </div>
    );
  }
}

export default FdgHrchy;