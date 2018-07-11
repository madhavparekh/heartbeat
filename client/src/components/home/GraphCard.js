import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

import Layout from '../staticGraph/Layout';
import AggrePlot from "../staticGraph/AggrePlot"
import GaugePicker from '../guage/GaugePicker';

const GraphCard = (props) => {
  if (!props[props.currentFlowDataName]) {
    return null;
  }
  return (
    <Card>
      <CardContent>

        <div
          style={{
            width: '400px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <GaugePicker
            gauges={props.gauges}
            fetchFlowData={(gaugeId) => {
              props.fetchFlowData(gaugeId);
            }}
          />
          <h1 style={{ paddingTop: '10px' }}>{props.gaugeId}</h1>
        </div>

        {props.currentFlowDataName === 'unImpairedAggr' ? <AggrePlot data={props[props.currentFlowDataName]} /> : <Layout data={props[props.currentFlowDataName]} currentFlowDataName={props.currentFlowDataName} />}
      </CardContent>
    </Card>
  );
};

GraphCard.propTypes = {
  gaugeId: PropTypes.string.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  currentFlowDataName: PropTypes.string,
  fetchFlowData: PropTypes.func,
  gauges: PropTypes.array
};

export default GraphCard;
