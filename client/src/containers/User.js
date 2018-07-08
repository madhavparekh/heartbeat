import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as userAction from '../actions/user';
import Login from '../components/user/Login';

class User extends React.Component {
  render() {
    return (
      <Login
        logInUser={(user) => {
          this.props.logInUser(user.email, user.password);
        }}
      />
    );
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
    signUpUser: (email, password) =>
      dispatch(userAction.signUpUser(email, password)),
    logInUser: (email, password) =>
      dispatch(userAction.logInUser(email, password)),
    logOutUser: () => dispatch(userAction.logOutUser()),
  };
};

User.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)
);
