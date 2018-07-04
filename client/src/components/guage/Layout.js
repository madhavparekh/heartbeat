// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core"

// import CountOverview from "./CountOverview";
// import CountButtons from "./CountButtons";

// type Props = {
//     guages: Array,
//     fetchGuages: Function,
// };

const Layout = props => (
    <div>
        {/* <CountOverview guages={props.guages} />
        <CountButtons changeCount={number => props.changeCount(number)} /> */}
            <Button 
                onClick={() => props.fetchGuages()}>
                Get Guages
            </Button>
            <ul>
                {/* {props.guages.map(guage => <li key={'guage-${guage}'}>{guage}</li>)} */}
            </ul>
    </div>
);

Layout.propTypes = {
    guages: PropTypes.array,
    fetchGuages: PropTypes.func.isRequired,
};

export default Layout;
