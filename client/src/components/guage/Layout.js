// @flow
import * as React from "react";
import PropTypes from "prop-types";

// import CountOverview from "./CountOverview";
// import CountButtons from "./CountButtons";

type Props = {
    guages: Array,
    fetchGuages: Function,
};

const Layout = (props: Props) => (
    <div>
        {/* <CountOverview guages={props.guages} />
        <CountButtons changeCount={number => props.changeCount(number)} /> */}
    </div>
);

Layout.propTypes = {
    guages: PropTypes.array.isRequired,
    fetchGuages: PropTypes.func.isRequired,
};

export default Layout;
