import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseDMS } from "../helpers";
import { updateSelectedGauge } from "../actions/guage";
import BaseMap from "../components/map/BaseMap";
import * as flow from "../actions/flowData";

class Map extends React.PureComponent {
  fetchFlowData(gaugeId) {
    this.props.updateSelectedGauge(gaugeId);
    this.props.fetchImpairedData(gaugeId);
    this.props.fetchUnImpairedData(gaugeId);
    this.props.fetchImpairedAggrData(gaugeId);
    this.props.fetchUnImpairedAggrData(gaugeId);
  }

  convertDMS() {
    return this.props.gauges.map(gauge => {
      return {
        ...gauge,
        latitude: parseDMS(gauge.latitude),
        longitude: parseDMS(gauge.longitude),
      };
    });
  }

  render() {
    return (
      <BaseMap
        gauges={this.convertDMS()}
        updateSelectedGauge={gaugeId => this.fetchFlowData(gaugeId)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    gauges: state.guage.guages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImpairedData: gaugeId => dispatch(flow.fetchImpairedData(gaugeId)),
    fetchUnImpairedData: gaugeId => dispatch(flow.fetchUnImpairedData(gaugeId)),
    fetchImpairedAggrData: gaugeId =>
      dispatch(flow.fetchImpairedAggrData(gaugeId)),
    fetchUnImpairedAggrData: gaugeId =>
      dispatch(flow.fetchUnImpairedAggrData(gaugeId)),
    updateCurrentFlowDataName: name =>
      dispatch(flow.updateCurrentFlowDataName(name)),
    updateSelectedGauge: d => dispatch(updateSelectedGauge(d)),
  };
};

Map.propTypes = {
  gauges: PropTypes.array,
  fetchUnImpairedData: PropTypes.func.isRequired,
  fetchImpairedData: PropTypes.func.isRequired,
  fetchImpairedAggrData: PropTypes.func.isRequired,
  fetchUnImpairedAggrData: PropTypes.func.isRequired,
  updateSelectedGauge: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
