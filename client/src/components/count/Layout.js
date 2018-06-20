// @flow
import * as React from "react";
import PropTypes from "prop-types";

import CountOverview from "./CountOverview";
import CountButtons from "./CountButtons";

type Props = {
  count: number,
  changeCount: Function,
};

const Layout = (props: Props) => (
  <div>
    <CountOverview count={props.count} />
    <CountButtons changeCount={number => props.changeCount(number)} />
  </div>
);

Layout.propTypes = {
  count: PropTypes.number.isRequired,
  changeCount: PropTypes.func.isRequired,
};

export default Layout;
