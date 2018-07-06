import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//water project
import { fetchGuages } from '../actions/guage';
// import { fetchDefaultData } from "../actions/record"

import Layout from '../components/home/Layout';

export class Home extends React.Component {
  render() {
    return (
      <Layout
        //water project
        // fetchGuages={() => this.props.fetchGuages()}
        // fetchDefaultData={() => this.props.fetchDefaultData()}
      />
    );
  }
}

Home.propTypes = {
  //water project
  fetchGuages: PropTypes.func.isRequired,
  // fetchDefaultData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    //water project
    guages: state.guage.guages,
    // defaultView: state.record.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //water project
    fetchGuages: () => dispatch(fetchGuages()),
    // fetchDefaultData: () => dispatch(fetchDefaultData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
