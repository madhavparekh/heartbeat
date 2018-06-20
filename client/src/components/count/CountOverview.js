// @flow
import React from "react";

type Props = {
  count: number,
};

const CountOverview = (props: Props) => <h1>{`Count: ${props.count}`}</h1>;

export default CountOverview;
