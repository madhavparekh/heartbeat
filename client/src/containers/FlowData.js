import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as flow from '../actions/flowData';
import Layout from '../components/flowData/FlowData';

class FlowData extends React.Component {
  render() {
    const gauge_id = this.props.gauge_id || '08251500';
    return (
      <Layout
        gauge_id={gauge_id}
        unImpairedAggr={this.props.unImpairedAggr}
        impairedAggr={this.props.impairedAggr}
        impaired={this.props.impaired}
        unImpaired={this.props.unImpaired}
        fetchImpairedData={(gauge_id) => this.props.fetchImpairedData(gauge_id)}
        fetchUnImpairedData={(gauge_id) =>
          this.props.fetchUnImpairedData(gauge_id)
        }
        fetchImpairedAggrData={(gauge_id) =>
          this.props.fetchImpairedAggrData(gauge_id)
        }
        fetchUnImpairedAggrData={(gauge_id) =>
          this.props.fetchUnImpairedAggrData(gauge_id)
        }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImpairedData: (gauge_id) => dispatch(flow.fetchImpairedData(gauge_id)),
    fetchUnImpairedData: (gauge_id) =>
      dispatch(flow.fetchUnImpairedData(gauge_id)),
    fetchImpairedAggrData: (gauge_id) =>
      dispatch(flow.fetchImpairedAggrData(gauge_id)),
    fetchUnImpairedAggrData: (gauge_id) =>
      dispatch(flow.fetchUnImpairedAggrData(gauge_id)),
  };
};

FlowData.propTypes = {
  fetchUnImpairedData: PropTypes.func.isRequired,
  fetchImpairedData: PropTypes.func.isRequired,
  fetchImpairedAggrData: PropTypes.func.isRequired,
  fetchUnImpairedAggrData: PropTypes.func.isRequired,
  gauge_id: PropTypes.number.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowData);
