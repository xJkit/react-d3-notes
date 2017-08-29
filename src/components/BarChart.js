import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledBlock = styled.div`
  padding: 20px;
`;

const ButtonGroup = styled.div`
  > button {
    margin-right: 4px;
  }
`;

class BarChart extends Component {
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
    this.svgNode = null;
    this.state = {
      rectWidth: 30,
      rectStep: 35,
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
      isSortAscending: true,
      barData: [50, 43, 120, 87, 99, 167, 142],
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    // set svg context
    this.svgNode = d3.select(this.node);
    // begin to render the charts
    this.renderChartAndLabel();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    // render chart when data update is finished
    this.renderChartAndLabel();
  }

  renderLabel = () => {
    const svg = this.svgNode;
    const { barData } = this.state;
    // draw the label
    // update-enter-exit phase
    const updateText = svg.selectAll('text').data(barData);
    const enterText = updateText.enter();
    const exitText = updateText.exit();
    // add labels
    enterText.append('text')
    .attr('x', (d, i) => this.state.padding.left + i * this.state.rectStep)
    .attr('y', d => this.props.height - d)
    .attr('dx', this.state.rectWidth / 2)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('font-size', '14px')
    .text(d => d);
    // update text
    updateText
    .attr('x', (d, i) => this.state.padding.left + i * this.state.rectStep)
    .attr('y', d => this.props.height - d)
    .attr('dx', this.state.rectWidth / 2)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('font-size', '14px')
    .text(d => d);
    // remove text
    exitText.remove();
  }

  renderChart = () => {
    const svg = this.svgNode;
    const { barData } = this.state;
    // draw the histogram
    // update-enter-exit part
    const updateRect = svg.selectAll('rect').data(barData);
    const enterRect = updateRect.enter();
    const exitRect = updateRect.exit();
    // add new data
    enterRect.append('rect')
      .attr('fill', 'steelblue')
      .attr('x', (d, i) => {
        return this.state.padding.left + i * this.state.rectStep;
      })
      .attr('y', (d, i) => {
        return this.props.height - d - this.state.padding.bottom;
      })
      .attr('width', this.state.rectWidth)
      .attr('height', d => d);
      // update charts
    updateRect
      .attr('fill', 'steelblue')
      .attr('x', (d, i) => {
        return this.state.padding.left + i * this.state.rectStep;
      })
      .attr('y', (d, i) => {
        return this.props.height - d - this.state.padding.bottom;
      })
      .attr('width', this.state.rectWidth)
      .attr('height', d => d);
    // remove redundant chart
    exitRect.remove();
  }

  renderChartAndLabel = () => {
    this.renderChart();
    this.renderLabel();
  }

  handleBtnAdd = () => {
    const random = d3.randomUniform(20, 200);
    const newNum = Math.ceil(random());
    this.setState({
      barData: this.state.barData.concat(newNum),
    });
    console.log('barData: ', this.state.barData);
  }

  handleBtnRemove = () => {
    let tempBarData = this.state.barData;
    tempBarData.pop();
    this.setState({
      barData: tempBarData,
    });
    console.log('barData: ', this.state.barData);
  }

  handleBtnSort = () => {
    let tempBarData = this.state.barData;
    if (this.state.isSortAscending) {
      tempBarData.sort((a, b) => a - b);
    } else {
      tempBarData.sort((a, b) => b - a);
    }

    this.setState({
      isSortAscending: !this.state.isSortAscending,
      barData: tempBarData,
    });
  }

  render() {
    return (
      <StyledBlock>
        <svg
          ref={node => this.node = node}
          width={this.props.width}
          height={this.props.height}
        />
        <ButtonGroup>
          <button onClick={this.handleBtnAdd}>Add</button>
          <button onClick={this.handleBtnRemove}>Remove</button>
          <button onClick={this.handleBtnSort}>Sort</button>
        </ButtonGroup>
      </StyledBlock>
    )
  }
}

export default BarChart;
