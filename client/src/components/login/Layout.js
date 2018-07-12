import React from "react";
import PropTypes from "prop-types";
// import Snackbar from "@material-ui/core/Snackbar";

import LoginCard from "./LoginCard";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <LoginCard logInUser={this.props.logInUser} />
      </div>
    );
  }
}

Layout.propTypes = {
  logInUser: PropTypes.func.isRequired,
};
