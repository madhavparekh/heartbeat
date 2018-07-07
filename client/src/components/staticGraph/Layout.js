import React, { Component} from "react";
import * as d3 from 'd3';

const mockData = [
  {
    discharge: 2,
    date: "1999-07-03",
  },
  {
    discharge: 4,
      date: "1999-07-04",
  },
  {
    discharge: 6,
      date: "1999-07-05",
  },
  {
    discharge: 8,
      date: "1999-07-06",
  },
  {
    discharge: 10,
      date: "1999-07-07",
  },
  {
    discharge: 12,
      date: "1999-07-08",
  },
  {
    discharge: 14,
      date: "1999-07-09",
  },
    {
        discharge: 16,
        date: "1999-07-10",
    },
    {
        discharge: 18,
        date: "1999-07-11",
    },
    {
        discharge: 22,
        date: "1999-07-12",
    }
];

class StaticGraph extends Component {

constructor(props) {
    super();

    this.xScale = d3.scaleTime();
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
        .range([0, 485]);

    this.yScale
        .domain([0,20])
        .range([0, 485]);

    this.line.x(d => this.xScale( parseTime(d.date) )).y(d => this.yScale(d.discharge))  

    // console.log(d3.select(this.node))
    svg.attr("d", this.line(mockData))
}


render() {
    return (
        <svg width="500" height="500" ref={(node) => (this.node = node)} />
    )

}


}

export default StaticGraph