import React, { Component } from "react";
import * as d3 from 'd3';
import PropTypes from 'prop-types';


class StaticGraph extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            d3Line: null,
            yScale: null,
            xScale: null,
            width: 1000,
            height: 750,
        }
        // this.xScale = d3.scaleLinear();
        // this.yScale = d3.scaleLinear();
        // this.line = d3.line()
        

    }

    componentDidUpdate() {
        // this.updateD3()

    }

    // static getDerivedStateFromProps(this.props, state) {
        
    //     let data = this.props.data.map((d) => [d.discharge, d.date]);
    //     console.log(data)
    //     let [xScale, yScale, d3Line] =
    //         this.determineScales(data);

    //     return {
    //         xScale: xScale,
    //         yScale: yScale,
    //         d3Line: d3Line
    //     }
    // }

    componentWillReceiveProps(newProps) {
        let data = newProps.data.map((d) => [d.date, d.discharge]);

        let [xScale, yScale, d3Line] =
            this.determineScales(newProps.startDate,
                newProps.endDate,
                data);
        
        this.setState({
            data: data,
            xScale: xScale,
            yScale: yScale,
            d3Line: d3Line
        });
    }
    
    determineScales(startDate, endDate, data) {

        const parseTime = d3.timeParse('%Y-%m-%d');

        const newData = data.map((d) => {
          return { date: parseTime(d[0]), discharge: d[1] };
        });

        let xScale = d3.scaleLinear()
            .domain(d3.extent(newData, d => d.date))
            .range([100, 1000]);

        let yScale = d3.scaleLinear()
          .domain(d3.extent(newData, (d) => d.discharge))
          .range([450, 0]);

        let d3Line = d3.line()
          .x((d) => d3.scaleLinear(d.date))
          .y((d) => d3.scaleLinear(d.discharge));

        return [xScale, yScale, d3Line];
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
        return (
        <div>    
            {/* <svg width="100%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} /> */}
            <svg className="timechart"
                style={{width: "100%", height:"150px"}}>
                <g transform="translate(70,10)">
                    <path className="chart-line" 
                        d={this.state.d3Line(this.state.data)}/>
                </g>    
            </svg>    
        </div>    
    )


    }


}

StaticGraph.propTypes = {
  data: PropTypes.array,
  d3Line: PropTypes.func,
};

export default StaticGraph