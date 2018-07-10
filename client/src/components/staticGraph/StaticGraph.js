/*eslint-disable*/
import React, { Component } from "react";
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import Axis from "./Axis";


class StaticGraph extends Component {

    constructor(props) {
        super(props);
        
        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleLinear();
        this.area = d3.area();
        this.line = d3.line();
        this.parseTime = d3.timeParse("%Y-%m-%d");
    }

    componentDidUpdate() {
        d3.select(this.node).selectAll('path').remove()
        this.updateD3()

    }

    updateD3() {
        if(this.props.data.length > 1){

            const newData = this.props.data.map(d => {
                return {
                    date: this.parseTime(d.date),
                    discharge: d.discharge
                }
            })
            const width = 1000
            const svg = d3.select(this.node).append("path")
    
            this.xScale.domain(d3.extent(newData, d => d.date)).range([100, width]);
    
            this.yScale.domain(d3.extent(newData, (d) => d.discharge)).range([450, 0]);
    
            this.area.x(d => this.xScale(this.parseTime(d[0])))
                .y1(d => this.yScale(d[1]))
                .y0(this.yScale(0));  
    
            this.line.x((d) => this.xScale(d.date)).y((d) => this.yScale(d.discharge));
    
            svg
              .attr('d', this.line(newData))
              .attr('fill', 'none')
              .attr('stroke', 'blue')
              .attr("width", width)
        }

    }


    render() {
        return <svg width="90%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} />
        
    }


}

StaticGraph.propTypes = {
  data: PropTypes.array,
};

export default StaticGraph