import React from "react";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import Layout from '../staticGraph/Layout';
import AggrePlot from "../staticGraph/AggrePlot"

const GraphCard = (props) => {

  if(!props[props.currentFlowDataName]){
    return null
  }
  return <Card>
      <CardContent>
        <h1>{props.gaugeId}</h1>
        {props.currentFlowDataName === 'unImpairedAggr' ? <AggrePlot data={props[props.currentFlowDataName]}  /> : <Layout data={props[props.currentFlowDataName]} currentFlowDataName={props.currentFlowDataName} />}
      </CardContent>
    </Card>;};

GraphCard.propTypes = {
  gaugeId: PropTypes.string.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  currentFlowDataName: PropTypes.string,
};

export default GraphCard;