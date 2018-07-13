/*eslint-disable*/
import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import Axis from "./Axis";

class StaticGraph extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleTime();
    this.yScale = d3.scaleLinear();
    this.area = d3.area();
    this.line = d3.line();
    this.parseTime = d3.timeParse("%Y-%m-%d");
  }

  componentDidUpdate() {
    d3.select(this.node)
      .selectAll("path")
      .remove();
    d3.select(this.node)
      .selectAll("g")
      .remove();
    this.updateD3();
  }

  updateD3() {
    if (this.props.data.length > 1) {
      let newData = this.props.data.map(d => {
        return {
          date: this.parseTime(d.date),
          discharge: d.discharge,
        };
      });

      let newCompareData = this.props.compareData.map(d => {
        return {
          date: this.parseTime(d.date),
          discharge: d.discharge,
        };
      });

      newData = newData.slice(0, newData.length - 2);
      newCompareData = newCompareData.slice(0, newCompareData.length - 2);

      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const height = 650 - margin.top - margin.bottom;
      const width = 3200;

      const svg = d3.select(this.node).append("path");
      const svg2 = d3.select(this.node).append("path");

      const axisWarp = d3
        .select(this.node)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const axisWarpX = d3
        .select(this.node)
        .append("g")
        .attr("transform", "translate(0," + height + ")");

      this.xScale.domain(d3.extent(newData, d => d.date)).range([20, width]);

      this.yScale
        .domain(d3.extent(newData, d => d.discharge))
        .range([height - 20, 20]);

      this.area
        .x(d => this.xScale(this.parseTime(d.date)))
        .y1(d => this.yScale(d.discharge))
        .y0(d => this.yScale(d.discharge));

      this.line.x(d => this.xScale(d.date)).y(d => this.yScale(d.discharge));
      //   .curve((d3.curveCatmullRom.alpha(0.75)))

      svg
        .attr("d", this.line(newData))
        .attr("fill", "none")
        .attr("stroke", "#42a5f5")
        .attr("stroke-width", "5")
        .attr("width", width);

      axisWarpX
        .call(d3.axisBottom(this.xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      axisWarp
        .call(d3.axisLeft(this.yScale))
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
  }

  render() {
    return (
      <svg
        width="100%"
        height="600px"
        preserveAspectRatio="none"
        ref={node => (this.node = node)}
      />
    );
  }
}

StaticGraph.propTypes = {
  data: PropTypes.array,
};

export default StaticGraph;
