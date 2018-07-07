import React from "react";
import PropTypes from 'prop-types';
import StaticGraph from "./StaticGraph";

const Layout = ({data}) => {
    return <StaticGraph data={data} /> 
}

Layout.propTypes = {
    data: PropTypes.array,
};

export default Layout