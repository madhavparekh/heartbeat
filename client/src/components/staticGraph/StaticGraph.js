import React, { Component } from "react";
import * as d3 from 'd3';
import PropTypes from 'prop-types';


class StaticGraph extends Component {

    constructor(props) {
        super(props);

        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleLinear();
        this.line = d3.line()

    }

    componentDidUpdate() {
        this.updateD3()
    }

    updateD3() {
        const parseTime = d3.timeParse("%Y-%m-%d")
        const newData = this.props.data.map(d => {
            return {
                date: parseTime(d.date),
                discharge: d.discharge
            }
        })
        const width = 1000
        const svg = d3.select(this.node).append("path")

        this.xScale.domain(d3.extent(newData, d => d.date)).range([100, width]);

        this.yScale.domain(d3.extent(newData, (d) => d.discharge)).range([450, 0]);

        this.line.x((d) => this.xScale(d.date)).y((d) => this.yScale(d.discharge));

        svg
          .attr('d', this.line(newData))
          .attr('fill', 'none')
          .attr('stroke', 'blue')
          .attr("width", width)


    }


    render() {
        if(!this.props.data){
            return null
        }
        return <svg width="100%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} />;

    }


}

StaticGraph.propTypes = {
  data: PropTypes.array,
};

export default StaticGraph