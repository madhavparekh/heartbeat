import * as React from "react";
import ReactMapGL from "react-map-gl";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { assign } from "lodash";

import { defaultMapStyle } from "./map-style.js";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        height: 400,
        latitude: 36.2055,
        longitude: -105.9638,
        width: 550,
        zoom: 8,
      },
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.gauges.length < 1) {
      return null;
    }
    const combinedGauges = {
      gauges: {
        data: { type: "FeatureCollection", features: [] },
        type: "geojson",
      },
    };

    props.gauges.forEach(gauge => {
      const properties = {
        properties: {
          description: gauge.description,
          gaugeId: gauge.gauge_id,
        },
      };
      const geometry = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [gauge.latitude, gauge.longitude],
        },
      };
      combinedGauges.gauges.data.features.push(
        assign({}, geometry, properties)
      );
    });

    const mapStyle = defaultMapStyle.set(
      "sources",
      fromJS(assign({}, defaultMapStyle.get("sources").toJS(), combinedGauges))
    );

    return { mapStyle };
  }

  render() {
    return (
      <div style={{ margin: "20px auto" }}>
        <ReactMapGL
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        />
      </div>
    );
  }
}

BaseMap.propTypes = {
  gauges: PropTypes.array,
};

export default BaseMap;
