import React from "react";
import PropTypes from "prop-types";

const CountButtons = ({ changeCount }) => (
  <div>
    <button onClick={() => changeCount(1)}>{"+1"}</button>
    <button onClick={() => changeCount(-1)}>{"-1"}</button>
  </div>
);

CountButtons.propTypes = {
  changeCount: PropTypes.func.isRequired,
};

export default CountButtons;
