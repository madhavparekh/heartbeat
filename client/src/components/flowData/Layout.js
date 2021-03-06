import React from "react";
import PropTypes from "prop-types";//eslint-disable-line
import FlowData from "./FlowData";


const Layout = (props) => (
        <FlowData
            gauge_id={props.gauge_id}
            fetchImpairedData={props.fetchImpairedData}
            fetchUnImpairedData={props.fetchUnImpairedData}
            fetchUnImpairedAggrData={props.fetchUnImpairedAggrData}
            fetchImpairedAggrData={props.fetchImpairedAggrData}
            unImpairedAggr={props.unImpairedAggr}
            impaired={props.impaired}
            impairedAggr={props.impairedAggr}
            
        />
);

Layout.propTypes = {
    gauge_id: PropTypes.string.isRequired,
    fetchImpairedData: PropTypes.func.isRequired,
    fetchUnImpairedData: PropTypes.func.isRequired,
    fetchUnImpairedAggrData: PropTypes.func.isRequired,
    fetchImpairedAggrData: PropTypes.func.isRequired,
    unImpairedAggr: PropTypes.array,
    unImpaired: PropTypes.array,
    impaired: PropTypes.array,
    impairedAggr: PropTypes.array,
};

export default Layout;