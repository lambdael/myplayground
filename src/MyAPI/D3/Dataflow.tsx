import { Component } from 'react';
import * as React from 'react';

import * as d3 from 'd3';
import { AxisScale } from 'd3';
export type Data = { data: [number, number][] };

import { MyProps } from '../Container';
import { MyAudioNode, Input } from '../api';
// import * as A from './actions';
// import { MyAudioNode, Input, Output } from '../api';
function layoutOutput(o: MyAudioNode) {
  let arcs = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2);
  if (o) {
    return o.name;
  } else {
    return 'sfgszfg';
  }
}
export class DataflowD3 extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }
  //node: SVGSVGElement | null;

  componentDidMount() {
    this.createLineChart = this.createLineChart.bind(this);
    this.createLineChart();

    //  this.createLineChart();
  }
  componentDidUpdate() {
    this.createLineChart();

  }
  createLineChart() {

    // d3.range(10).map(function (i) {
    //   return { x: i, y: Math.sin(i) + 5 };
    // });

    // let lineF = d3.line()
    //   .x(function (d) { return x(d[0]); })
    //   .y(function (d) { return y(d[1]); });

    // svg = d3.select(this.node);

    // let svg = d3.select(this.node);
    let svg = d3.selectAll('#dataflow');
    console.log('aasas');
    svg.text('dsdfs');
    console.log(svg);
    let data = [100, 200, 300];

    let t = this.props.dataflow;
    console.log(t);
    // let circles = svg.selectAll('circle').data(data).enter()
    //   .append('circle')
    //   .attr('cx', function (d) { return d; })
    //   .attr('cy', function (d) { return d; })
    //   .attr('r', 30)
    //   .attr('fill', 'green');

    if (t) {
      console.log('aasas');

      // let //width = 500,
      //height = 500,
      // margin = 50,
      // x = d3.scaleLinear()
      //   .domain([0, 10])
      //   .range([margin, width - margin]),
      // y = d3.scaleLinear()
      //   .domain([0, 10])
      //   .range([height - margin, margin]);
      //svg.attr('height', height)
      //  .attr('width', width);

      // let o = svg.selectAll('text').data(t.outputs, this.layoutOutput);

      // svg.append(o);
      let inputslistX = 10;
      let outputslistX = 500;
      let nodeslistX = 200;
      let fontsize = 20;
      // svg.text('dsdfs');
      let ol = d3.selectAll('#outputsList');

      let os = ol.selectAll('g.outputs').data(t.outputs).enter()
        .append('g')
        .attr('x', function (d) { return outputslistX; })
        .attr('y', function (d, idx) { return fontsize * (idx + 1); })
        // .selectAll('g.outputs.inputs').data(t.outputs).enter()
        // .append('g').data(function (d, i) { return d.inputs; }).enter() // inputs in a node
        // .attr('x', function (d) { return outputslistX; })
        // .attr('y', function (d, idx) { return fontsize * (idx + 1); })

        ;
      // svg.append(os);
      console.log(os);

      let is = d3.selectAll('inputs').data(t.inputs).enter()
        .attr('cx', function (d) { return inputslistX; })
        .attr('cy', function (d, idx) { return fontsize * (idx + 1); })
        ;
      let nodes = d3.merge([t.outputs, t.inputs, t.nodes]);
      // d3.selectAll('inputs').
      //   nodes.append('outputs')
      //   .data(function (d, i) { return d.outputs; }).enter(); // outputs in a node

      svg.selectAll('circle').data(t.outputs).enter()
        .append('circle')
        .attr('cx', function (d) { return outputslistX; })
        .attr('cy', function (d, idx) { return fontsize * (idx + 1); })
        .attr('r', fontsize / 2)
        .attr('fill', 'green');
      svg.selectAll('text.ss').data(t.outputs).enter()
        .append('text')
        .text(layoutOutput)
        .attr('x', function (d) { return outputslistX + fontsize / 2; })
        .attr('y', function (d, idx) { return fontsize * (idx + 1) + fontsize / 2; })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '20px')
        .attr('fill', 'red');

      svg.selectAll('circle.ert').data(t.nodes).enter()
        .append('circle')
        .attr('cx', function (d) { return nodeslistX; })
        .attr('cy', function (d, idx) { return fontsize * (idx + 1); })
        .attr('r', fontsize / 2)
        .attr('fill', 'green');
      svg.selectAll('text.tr').data(t.nodes).enter()
        .append('text')
        .text(layoutOutput)
        .attr('x', function (d) { return nodeslistX + fontsize / 2; })
        .attr('y', function (d, idx) { return fontsize * (idx + 1) + fontsize / 2; })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '20px')
        .attr('fill', 'red');

      svg.selectAll('circle.ert').data(t.inputs).enter()
        .append('circle')
        .attr('cx', function (d) { return inputslistX; })
        .attr('cy', function (d, idx) { return fontsize * (idx + 1); })
        .attr('r', fontsize / 2)
        .attr('fill', 'green')
        .selectAll('circle.sdsd')
        .data(function (d, i) { return d.inputs; }).enter() // inputs in a node
        .attr('cx', function (d) { return inputslistX; })
        .attr('cy', function (d, idx) { return fontsize * (idx + 1); })
        .attr('r', fontsize / 2)
        .attr('fill', 'purple')
        ;
      svg.selectAll('text.tr').data(t.inputs).enter()
        .append('text')
        .text(layoutOutput)
        .attr('x', function (d) { return inputslistX + fontsize / 2; })
        .attr('y', function (d, idx) { return fontsize * (idx + 1) + fontsize / 2; })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '20px')
        .attr('fill', 'red');

    }
    //   //        .attr('d', (d) => lineF(t))
    //   .attr('stroke', 'blue')
    //   .attr('stroke-width', 2)
    //   .attr('fill', 'none');
    // return svg.nodes();

    // return <div>{svg.nodes()}</div>;
    // this.node = <div>{svg.nodes()}</div>;

  }
  render() {
    return <div className='Dataflow'>
      <svg id='dataflow' width='800' height='400'>
        <g id='outputsList' />
        <g id='nodeList' />
        <g id='inputsList' />
      </svg>
      {this.props.timer.playngTime}
    </div>;
    //  return this.createLineChart();
  }
}

export default DataflowD3;
