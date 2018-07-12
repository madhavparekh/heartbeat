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
            let newData = this.props.data.map(d => {
                    return {
                        date: this.parseTime(d.date),
                        discharge: d.discharge
                    }
            })
            let newCompareData = this.props.compareData.map(d => {
                return {
                    date: this.parseTime(d.date),
                    discharge: d.discharge
                }
            })

            newData = newData.slice(0, newData.length - 2)
            const width = 1000
            const margin = { top: 20, right: 20, bottom: 30, left: 50 }
            
            const svg = d3.select(this.node).append("path")
            const svg2 = d3.select(this.node).append("path")
            const axisWarp = d3.select(this.node).append("g").attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
    
            this.xScale.domain(d3.extent(newData, d => d.date)).range([100, width]);
    
            this.yScale.domain(d3.extent(newData, (d) => d.discharge)).range([400, 0]);
    
            this.area
              .x((d) => this.xScale(this.parseTime(d.date)))
              .y1((d) => this.yScale(d.discharge))
              .y0( (d) => this.yScale(d.discharge));  
    
            this.line
              .x((d) => this.xScale(d.date))
              .y((d) => this.yScale(d.discharge))
            //   .curve((d3.curveCatmullRom.alpha(0.75)))
            
              
    
            svg
              .attr('d', this.line(newData))
              .attr('fill', 'none')
              .attr('stroke', '#42a5f5')
              .attr('stroke-width', '5')
              .attr("width", width)
           
            svg2
                .attr('d', this.line(newCompareData))
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('stroke-width', '5')
                .attr("width", width)

            axisWarp.attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

            axisWarp.call(d3.axisLeft(this.yScale));                                
        }

    }


    render() {
        return <svg width="100%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} />
                  
        
    }


}

StaticGraph.propTypes = {
  data: PropTypes.array,
};

export default StaticGraph