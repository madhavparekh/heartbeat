import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseDMS } from "../helpers";

import BaseMap from "../components/map/BaseMap";

class Map extends React.PureComponent {
  convertDMS() {
    return this.props.gauges.map(gauge => {
      return {
        ...gauge,
        latitude: parseDMS(gauge.latitude),
        longitude: parseDMS(gauge.longitude),
      };
    });
  }

  render() {
    return <BaseMap gauges={this.convertDMS()} />;
  }
}

const mapStateToProps = state => {
  return {
    gauges: state.guage.guages,
  };
};

Map.propTypes = {
  gauges: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null
)(Map);
