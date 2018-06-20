import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { changeCount } from "../actions/count";
import Layout from "../components/count/Layout";

class Count extends React.Component {
  render() {
    return (
      <Layout
        count={this.props.count}
        changeCount={n => this.props.changeCount(n)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCount: n => dispatch(changeCount(n)),
  };
};

Count.propTypes = {
  count: PropTypes.number.isRequired,
  changeCount: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
