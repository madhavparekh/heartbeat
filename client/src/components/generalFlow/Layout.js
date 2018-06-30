import React from "react";
import PropTypes from "prop-types";
import generalFlow from "./generalFlow"

const Layout = () => (


    <div>
        <div>
            Axis
        </div>
        <div>
            <generalFlow />
        </div>
    </div>
);

Layout.propTypes = {
    // todos: PropTypes.array.isRequired,
    // fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
