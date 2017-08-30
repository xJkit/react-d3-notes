import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';
import * as fakeData from '../fake/graph';

const StyledBlock = styled.div`
  padding: 20px;

  /* .links 是 g 圖層, line 在裡面 */
  line {
    stroke: grey;
    stroke-opacity: 0.6;
    stroke-width: 1px;
  }
  /* .nodes 是·g 圖層, circle 在裡面 */
  circle {
    stroke: #000;
    stroke-width: 2px;
  }
`;

const COLOR = d3.scaleOrdinal(d3.schemeCategory20);

class FDG extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };
  static defaultProps = {
    width: 600,
    height: 400,
  };

  constructor(props) {
    super(props);
    this.svg = null;
    // data is in the state:
    this.state = {
      nodes: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ],
      links: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 0 },
      ],
    };
  }

  componentDidMount() {
    this.renderGraph();
  }

  componentDidUpdate() {
    console.log('nodes: ', this.state.nodes);
    this.renderGraph();
  }

  setLineContext = () => {
    this.line = this.svg
      .selectAll("line")
      .data(this.state.links)
      .enter().append("line")
  }

  setCircleContext = () => {
    this.circle = this.svg
    .selectAll("circle")
    .data(this.state.nodes)
    .enter().append("circle")
    .attr("r", 8)
    .attr("fill", (d, i) => COLOR(i))
    .call(d3.drag()
      .on("start", this.dragstarted.bind(this))
      .on("drag", this.dragged.bind(this))
      .on("end", this.dragended.bind(this)));
  }

  setSimulationContext = () => {
    this.simulation = d3.forceSimulation(this.state.nodes)
      .velocityDecay(0.5)
      .force("link", d3.forceLink(this.state.links).id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force('collide', d3.forceCollide(12.5))
      .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
      .on("tick", this.ticked.bind(this));
    this.simulation.alpha(1.5);
    this.simulation.alphaMin(0.001);
    this.simulation.alphaDecay(0.0228);
    this.simulation.alphaTarget(0);
  }

  renderGraph = () => {
  /**
   * render 順序:
   * 1. 設定 links: selectAll('line') =>  .data => .enter().append('line')  => .attr...
   * 2. 設定 nodes: selectAll('circle') => .data => .enter().append('circle') => .attr... => .call(d3.drag().on('start').on('drag').on('end'))
   * 3. 設定 simulation (需要 nodes 與 links)
   * 4. 將 simulation 靠 ticked 綁定 nodes: simulation.nodes(data.nodes).on('ticked', ticked)
   * 5. 將 simulation 靠 force 模組綁定 links: simulation.force('link').links(data.links)
   * 6. 設定 ticked (內含設定 link 與 node 的行為)
   */
    // 設定 links
    this.setLineContext();
    // 設定 nodes
    this.setCircleContext();
    // 設定 force simulation
    this.setSimulationContext();
  }

  ticked = () => {
    this.line
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    this.circle
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  // 力導向圖的拖曳
  dragstarted = () => {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.x;
  }

  dragged = () => {
    d3.event.subject.fx = d3.event.x; // 拖曳過程中固定節點位置到游標位置
    d3.event.subject.fy = d3.event.y;
  }

  dragended = () => {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d3.event.subject.fx = null; // 拖曳結束後停止固定拖放物件
    d3.event.subject.fy = null;
  }

  onAddBtnClicked = () => {
    this.setState({
      nodes: this.state.nodes.concat({ id: 6 }),
      links: this.state.links.concat({ source: 1, target: 6 }),
    });
  }

  render() {
    return (
      <StyledBlock>
        <svg
          ref={node => this.svg = d3.select(node)}
          width={this.props.width}
          height={this.props.height}
        />
        <button onClick={this.onAddBtnClicked}>Add</button>
      </StyledBlock>
    );
  }
}

export default FDG;
