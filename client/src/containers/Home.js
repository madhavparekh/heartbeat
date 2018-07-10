import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as flow from '../actions/flowData';
import Layout from '../components/home/Layout';

class Home extends React.Component {

  componentDidMount(){
    const gaugeId = '08251500';

    this.props.fetchImpairedData(gaugeId);
    this.props.fetchUnImpairedData(gaugeId)
    this.props.fetchImpairedAggrData(gaugeId)
    this.props.fetchUnImpairedAggrData(gaugeId);
  
  }
  
  render() {

    return (
      <Layout
        gaugeId='08251500'
        unImpairedAggr={this.props.unImpairedAggr}
        impairedAggr={this.props.impairedAggr}
        impaired={this.props.impaired}
        unImpaired={this.props.unImpaired}
        currentFlowDataName={this.props.currentFlowDataName}
        updateCurrentFlowDataName={(name) => this.props.updateCurrentFlowDataName(name)}

      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    impaired: state.flowData.impaired,
    unImpaired: state.flowData.unImpaired,
    impairedAggr: state.flowData.impairedAggr,
    unImpairedAggr: state.flowData.unImpairedAggr,
    currentFlowDataName: state.flowData.currentFlowDataName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImpairedData: (gaugeId) => dispatch(flow.fetchImpairedData(gaugeId)),
    fetchUnImpairedData: (gaugeId) => dispatch(flow.fetchUnImpairedData(gaugeId)),
    fetchImpairedAggrData: (gaugeId) => dispatch(flow.fetchImpairedAggrData(gaugeId)),
    fetchUnImpairedAggrData: (gaugeId) => dispatch(flow.fetchUnImpairedAggrData(gaugeId)),
    updateCurrentFlowDataName: (name) => dispatch(flow.updateCurrentFlowDataName(name)),
  };
};

Home.propTypes = {
  fetchUnImpairedData: PropTypes.func.isRequired,
  fetchImpairedData: PropTypes.func.isRequired,
  fetchImpairedAggrData: PropTypes.func.isRequired,
  fetchUnImpairedAggrData: PropTypes.func.isRequired,
  updateCurrentFlowDataName: PropTypes.func.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  currentFlowDataName: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
