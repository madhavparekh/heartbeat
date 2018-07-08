/*eslint-disable*/
import React, { Component } from "react";
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { isFunction } from "lodash"


class StaticGraph extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            d3Line: null,
            d3Area: null,
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

        let [xScale, yScale, d3Area, d3Line] =
            this.determineScales(newProps.startDate,
                newProps.endDate,
                data);

        if (this.state.data.length === 0){
            this.setState({
                data: data.map(d => [d[0], 0]),
                xScale: xScale,
                yScale: yScale,
                d3Area: d3Area,
                d3Line: d3Line
            });
        }

        this.animate(data, xScale, yScale, d3Area, d3Line);
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
          .x((d) => xScale(parseTime(d[0])))
          .y((d) => yScale(d[1]));

        let d3Area = d3.area()
            .x(d => xScale(parseTime(d[0])))
            .y1(d => yScale(d[1]))
            .y0(yScale(0));  

        return [xScale, yScale, d3Area, d3Line];
        
    }

    animate(data, xScale, yScale, d3Area, d3Line) {
        if (data.length > 0) {
            let node = d3.select(this.svg);
            let transition = d3.transition()
                .duration(750)
                .ease(d3.easeCubicInOut);

            node.select('.chart-area')
                .transition(transition)
                .attr('d', d3Area(data));

            node.select('.chart-line')
                .transition(transition)
                .attr('d', d3Line(data))
                .on('end', () => {
                    this.setState({
                        data: data,
                        xScale: xScale,
                        yScale: yScale,
                        d3Area: d3Area,
                        d3Line: d3Line
                    });
                });
        }
    }

    // updateD3() {    
    //     const parseTime = d3.timeParse("%Y-%m-%d")
    //     const newData = this.props.data.map(d => {
    //         return {
    //             date: parseTime(d.date),
    //             discharge: d.discharge
    //         }
    //     })
    //     const width = 1000
    //     const svg = d3.select(this.node).append("path")

    //     this.xScale.domain(d3.extent(newData, d => d.date)).range([100, width]);

    //     this.yScale.domain(d3.extent(newData, (d) => d.discharge)).range([450, 0]);

    //     this.line.x((d) => this.xScale(d.date)).y((d) => this.yScale(d.discharge));

    //     svg
    //       .attr('d', this.line(newData))
    //       .attr('fill', 'none')
    //       .attr('stroke', 'blue')
    //       .attr("width", width)

    // }


    render() {
        if(isFunction(this.state.d3Line)) {

            return (
                <div>    
                    {/* <svg width="100%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} /> */}
                    <svg className="timechart"
                        style={{width: this.state.width, height:"500px"}}>
                        <g transform="translate(70,10)">
                            <path className="chart-area"
                                d={this.state.d3Area(this.state.data)}/>
                            <path className="chart-line" 
                                d={this.state.d3Line(this.state.data)}/>
                        </g>    
                    </svg>    
                </div>    
            )
        }

        return (
                <svg width="100%" height="500px" preserveAspectRatio="none" ref={(node) => (this.node = node)} />    
        )


    }


}

StaticGraph.propTypes = {
  data: PropTypes.array,
  d3Line: PropTypes.func,
};

export default StaticGraph