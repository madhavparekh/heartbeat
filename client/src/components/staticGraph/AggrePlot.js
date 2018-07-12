/*eslint-disable*/
import React, { Component } from "react";
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


class AggrePlot extends Component {
    constructor(props) {
        super(props);

        this.xScale = d3.scaleTime();
        this.yScale = d3.scaleLinear();
        this.area = d3.area();
        this.line = d3.line();
        this.parseTime = d3.timeParse("%Y-%m-%d");
    }

    componentDidUpdate() {
        d3.select(this.node).selectAll('path').remove()
        d3.select(this.node).selectAll('g').remove()
        this.updateD3()
    }

    updateD3() {        
        if (this.props.impairedData.length > 1 && this.props.unImpairedData.length > 1) {

            let impairedData = this.props.impairedData.map(d => {
                return {
                    date: this.parseTime(d.date),
                    discharge: d.discharge
                }
            })

            let unImpairedData = this.props.unImpairedData.map(d => {
                return {
                    date: this.parseTime(d.date),
                    discharge: d.discharge
                }
            })

            impairedData = impairedData.slice(0, impairedData.length - 2)
            unImpairedData = unImpairedData.slice(0, unImpairedData.length - 2)

            const margin = { top: 20, right: 20, bottom: 20, left: 20 };
            const height = 650 - margin.top - margin.bottom;
            const xAxisHeight = 625
            const width = 1500
            const svg = d3.select(this.node).append("path")
            const svg2 = d3.select(this.node).append("path")

            const axisWarpY = d3
                .select(this.node)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            const axisWarpX = d3
                .select(this.node)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('transform', 'translate(20,' + xAxisHeight + ')')   

            this.xScale.domain(d3.extent(unImpairedData, d => d.date)).range([0, width]);

            this.yScale.domain(d3.extent(unImpairedData, (d) => d.discharge)).range([height, 0]);

            this.area.x(d => this.xScale(this.parseTime(d[0])))
                .y1(d => this.yScale(d[1]))
                .y0(this.yScale(0));

            this.line.x((d) => this.xScale(d.date)).y((d) => this.yScale(d.discharge));

            svg
              .attr('d', this.line(impairedData))
              .attr('fill', 'none')
              .attr('stroke', '#42a5f5')
              .attr('width', width);

            svg2
              .attr('d', this.line(unImpairedData))
              .attr('fill', 'none')
              .attr('stroke', 'red')
              .attr('width', width);
              
            axisWarpX.call(d3.axisBottom(this.xScale)).selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");;

            axisWarpY.call(d3.axisLeft(this.yScale));  
        }

    }


    render() {
        return( 
            <div>
                <Typography align="center" variant="display1" gutterBottom>
                    Dimensionless Hydrograph
                </Typography>
           <svg width="100%" height="675px" preserveAspectRatio="none" ref={(node) => (this.node = node)} />
           </div>
        )     
    }


}

AggrePlot.propTypes = {
    data: PropTypes.array,
};

export default AggrePlot