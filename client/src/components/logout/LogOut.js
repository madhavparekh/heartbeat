import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userAction from '../../actions/user';

class LogOut extends React.Component {
  componentDidMount() {
    this.props.logOutUser();
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    msg: state.user.msg,
    route: state.user.route,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(userAction.logOutUser()),
  };
};

LogOut.propTypes = {
  logOutUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut);
