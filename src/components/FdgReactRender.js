import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class FdgReactRender extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    linkDistance: PropTypes.number,
    forceStrength: PropTypes.number,
    nodes: PropTypes.array,
    links: PropTypes.array,
    genData: PropTypes.func,
  };
  static defaultProps = {
    width: 600,
    height: 600,
    linkDistance: 30,
    forceStrength: -20,
  };
  constructor(props) {
    super(props);
    // nodes and links are deeply copied to the props from the parent component states
    this.state = {
      nodes: props.nodes,
      links: props.links,
    };
    this.force = null;
    this.isUpdateData = false;
  }
  componentDidMount() {
    this.renderGraph();
  }

  componentWillReceiveProps({ nodes, links }) {
    this.setState({ nodes, links });
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

  renderGraph = () => {
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
            onClick={() => window.alert(`you click index ${index}`)}
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
        <div className="btn-group">
          <button onClick={this.props.genData}>Generate</button>
          <button onClick={this.props.appendData}>Append</button>
        </div>
      </div>
    );
  }
}

export default FdgReactRender;