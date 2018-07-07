// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import * as d3 from 'd3';

class FlowData extends Component  {

  constructor() {
    super();

    this.xScale = d3.scaleTime();
    this.yScale = d3.scaleLinear();
    this.line = d3.line()

    
    this.state = {
      realData : null
    }  
    

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
      .domain([0, 20])
      .range([0, 485]);

    this.line.x(d => this.xScale(parseTime(d.date))).y(d => this.yScale(d.discharge))

    // console.log(d3.select(this.node))
    svg.attr("d", this.line(this.state.realData))
  }
  
  render(){

    if (this.realData != null) {
      
      return (
        <svg width="500" height="500" ref={(node) => (this.node = node)} />
      )
    }

    return (
      <div>
          <Button onClick={() => this.props.fetchImpairedData(this.props.gauge_id)}>
            Get Impaired Data
          </Button>
          <Button onClick={() => this.props.fetchUnImpairedData(this.props.gauge_id)}>
            Get UnImpaired Data
          </Button>
          <Button onClick={() => this.props.fetchImpairedAggrData(this.props.gauge_id)}>
            Get Impaired Aggr Data
          </Button>
          <Button onClick={() => this.props.fetchUnImpairedAggrData(this.props.gauge_id)}>
            Get UnImpaired Aggr Data
          </Button>
          <ul>
            {this.props.impairedAggr && (
              <p>Length of impaired aggr: {this.props.impairedAggr.length}</p>
            )}
            {this.props.unImpairedAggr && (
              <p>Length of un impaired aggr: {this.props.unImpairedAggr.length}</p>
            )}
            {this.props.impaired && <p>Length of impaired: {this.props.impaired.length}</p>}
            {this.props.unImpaired && (
              <p>Length of un impaired: {this.props.unImpaired.length}</p>
            )}
          </ul>

      
        </div>)
      }  
  }

FlowData.propTypes = {
  gauge_id: PropTypes.string,
  fetchImpairedData: PropTypes.func,
  fetchUnImpairedData: PropTypes.func,
  fetchUnImpairedAggrData: PropTypes.func,
  fetchImpairedAggrData: PropTypes.func,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impaired: PropTypes.array,
  impairedAggr: PropTypes.array,
};

export default FlowData;
