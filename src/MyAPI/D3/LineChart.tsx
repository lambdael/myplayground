import { Component } from 'react';
import * as React from 'react';

import * as d3 from 'd3';
import { AxisScale } from 'd3';
export type Data = { data: [number, number][] };

export class LineChart extends Component<Data, {}> {
  constructor(props: Data) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
  }
  node: SVGSVGElement | null;

  componentDidMount() {
    this.createLineChart();
  }
  componentDidUpdate() {
    this.createLineChart();
  }

  createLineChart() {

    let width = 500,
      height = 500,
      margin = 50,
      x = d3.scaleLinear()
        .domain([0, 10])
        .range([margin, width - margin]),
      y = d3.scaleLinear()
        .domain([0, 10])
        .range([height - margin, margin]);

    d3.range(10).map(function (i) {
      return { x: i, y: Math.sin(i) + 5 };
    });

    let lineF = d3.line()
      .x(function (d) { return x(d[0]); })
      .y(function (d) { return y(d[1]); });

    if (this.node) {
      let svg = d3.select(this.node);

      svg.attr('height', height)
        .attr('width', width);
      let t = this.props.data;
      svg.append('path')

        .attr('d', (d) => lineF(t))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    }
  }

  render() {
    return <svg ref={node => this.node = node} />;
  }
}

export default LineChart;
