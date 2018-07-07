// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class FlowData extends Component  {
  
  render(){
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
  gauge_id: PropTypes.string.isRequired,
  fetchImpairedData: PropTypes.func.isRequired,
  fetchUnImpairedData: PropTypes.func.isRequired,
  fetchUnImpairedAggrData: PropTypes.func.isRequired,
  fetchImpairedAggrData: PropTypes.func.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impaired: PropTypes.array,
  impairedAggr: PropTypes.array,
};

export default FlowData;
