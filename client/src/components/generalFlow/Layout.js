import React from "react";
import PropTypes from "prop-types";
import GeneralFlow from "./GeneralFlow"

const Layout = () => (
  <div>
    <GeneralFlow />
  </div>
);

Layout.propTypes = {
    // todos: PropTypes.array.isRequired,
    // fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
