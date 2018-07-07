// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class FlowData extends Component  {
  
  render(){
    return (
      <div>
          <Button onClick={() => props.fetchImpairedData(props.gauge_id)}>
            Get Impaired Data
          </Button>
          <Button onClick={() => props.fetchUnImpairedData(props.gauge_id)}>
            Get UnImpaired Data
          </Button>
          <Button onClick={() => props.fetchImpairedAggrData(props.gauge_id)}>
            Get Impaired Aggr Data
          </Button>
          <Button onClick={() => props.fetchUnImpairedAggrData(props.gauge_id)}>
            Get UnImpaired Aggr Data
          </Button>
          <ul>
            {props.impairedAggr && (
              <p>Length of impaired aggr: {props.impairedAggr.length}</p>
            )}
            {props.unImpairedAggr && (
              <p>Length of un impaired aggr: {props.unImpairedAggr.length}</p>
            )}
            {props.impaired && <p>Length of impaired: {props.impaired.length}</p>}
            {props.unImpaired && (
              <p>Length of un impaired: {props.unImpaired.length}</p>
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
