/* eslint-disable */
import React, { Component } from 'react';
import * as d3 from 'd3';

const blackBox = D3render => {
    return class Blackbox extends Component {
        componentDidMount() {
            D3render.call(this);
        }
        componentDidUpdate() {
            D3render.call(this);
        }

        render() {
            if (this.props.orientation === 'bottom') {
                let { x, y } = this.props;
                return (
                    <g
                        transform={`translate(${x}, ${y})`}
                        ref={anchor => (this.anchor = anchor)}
                    />
                );
            } else {
                const { x, y } = this.props;
                return (
                    <g
                        transform={`translate(${x}, ${y})`}
                        ref={anchor => (this.anchor = anchor)}
                    />
                );
            }
        }
    };
};

const Axis = blackBox(function () {
    if (this.props.orientation === 'bottom') {
        const axis = d3
          .axisBottom()
          .scale(this.props.scale)
          .tickSize(-this.props.gridLength, 0, 10)
          .tickSizeOuter(0)
          .ticks(10)
          .tickFormat((d) => {
            return 1;
          });
        d3.select(this.anchor).call(axis);
    } else {
        const axis = d3
            .axisLeft()
            .tickSize(-this.props.gridLength, 0, 10)
            .tickSizeOuter(0)
            .scale(this.props.scale)
            .ticks(5)
            .tickPadding(5)
            .tickFormat(d => {
                return 1
            });
        d3.select(this.anchor).call(axis);
    }
});

export default Axis;