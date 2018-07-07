import React, { Component} from "react";
import * as d3 from 'd3';

const mockData = [
  {
    discharge: 2,
    date: 1,
  },
  {
    discharge: 4,
      date: 2,
  },
  {
    discharge: 6,
      date: 3,
  },
  {
    discharge: 8,
      date: 4,
  },
  {
    discharge: 10,
      date: 5,
  },
  {
    discharge: 12,
      date: 6,
  },
  {
    discharge: 14,
      date: 7,
  },
    {
        discharge: 16,
        date: 8,
    },
    {
        discharge: 18,
        date: 9,
    },
    {
        discharge: 22,
        date: 10,
    }
];

class StaticGraph extends Component {

constructor() {
    super();

    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.line = d3.line()

}

componentDidMount() {
    this.updateD3()
}

updateD3() {

    const svg = d3.select(this.node).append("path")
    const parseTime = d3.timeParse("%Y-%m-%d")
    
    this.xScale
        .domain([0,10])
        .range([0, 485]);

    this.yScale
        .domain([0,20])
        .range([0, 485]);

    this.line.x(d => this.xScale(d.date)).y(d => this.yScale(d.discharge))  

    // console.log(d3.select(this.node))
    svg.attr("d", this.line(mockData)).attr('stroke', 'black')
}


render() {
    return (
        <svg width="500" height="500" ref={(node) => (this.node = node)} />
    )

}


}

export default StaticGraph