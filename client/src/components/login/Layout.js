import React from 'react';
import PropTypes from 'prop-types';
// import Snackbar from "@material-ui/core/Snackbar";

import LoginCard from './LoginCard';
import NavBar from '../home/NavBar';

export default class Layout extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         showMessage: false,
  //         message
  //     }
  // }

  render() {
    return (
      <div>
        <NavBar />
        <LoginCard logInUser={this.props.logInUser} />
        {/* <Snackbar /> */}
      </div>
    );
  }
}

Layout.propTypes = {
  logInUser: PropTypes.func.isRequired,
};
