import * as React from "react";
import ReactMapGL from "react-map-gl";
import PropTypes from "prop-types";

import { getGaugeLayer } from "../../helpers";
import { defaultMapStyle, gaugeLayer } from "./map-style.js";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
      hoveredFeature: null,
      x: null,
      y: null,
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
    // the following method will take the incoming gauges, and append them onto map layers
    const mapStyle = getGaugeLayer(defaultMapStyle, props.gauges, gaugeLayer);

    return { mapStyle };
  }

  _onClick(event) {
    const { features } = event;
    if (features.find(f => f.layer.id.indexOf("gauges") >= 0)) {
      const hoveredFeature =
        features && features.find(f => f.layer.id.indexOf("gauge") >= 0);
      return this.props.updateSelectedGauge(hoveredFeature.properties.gaugeId);
    } else {
      return null;
    }
  }

  _onHover(event) {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    if (features.find(f => f.layer.id.indexOf("gauges") >= 0)) {
      const hoveredFeature =
        features && features.find(f => f.layer.id.indexOf("gauge") >= 0);
      return this.setState({ hoveredFeature, x: offsetX, y: offsetY });
    } else {
      return this.setState({ hoveredFeature: null, x: null, y: null });
    }
  }

  _renderTooltip() {
    const { hoveredFeature, x, y } = this.state;
    if (!hoveredFeature || !x || !y) {
      return null;
    }

    return (
      <div
        className="tooltip"
        style={{ position: "absolute", left: x, top: y }}
      >
        <div>{hoveredFeature.properties.description}</div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ margin: "20px auto", position: "relative" }}>
        <ReactMapGL
          maxZoom={8}
          minZoom={5}
          onHover={e => this._onHover(e)}
          onClick={e => this._onClick(e)}
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        />
        {this._renderTooltip()}
      </div>
    );
  }
}

BaseMap.propTypes = {
  gauges: PropTypes.array,
  updateSelectedGauge: PropTypes.func,
};

export default BaseMap;
