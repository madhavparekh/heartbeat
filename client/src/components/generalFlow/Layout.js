import React from "react";
import PropTypes from "prop-types";//eslint-disable-line
import GeneralFlow from "./generalFlow"

const Layout = () => (
    <GeneralFlow
      height={'250'}
      width={'97%'}
     />
);

Layout.propTypes = {
    // todos: PropTypes.array.isRequired,
    // fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
