import { fromJS } from "immutable";
import { assign } from "lodash";

function convertDMSToDD(degrees, minutes, seconds, direction) {
  let dd = Number(degrees) + Number(minutes / 60) + Number(seconds / (60 * 60));
  if (direction === "S" || direction === "W") {
    dd *= -1;
  } // Don't do anything for N or E

  return dd;
}

export function parseDMS(input) {
  const parts = input.split(/[^\d\w\.]+/); //eslint-disable-line
  return convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
}

export function getGaugeLayer(defaultMapStyle, propsGauges, gaugeLayer) {
  const newCombinedLayer = fromJS(
    defaultMapStyle
      .get("layers")
      .toJS()
      .concat(gaugeLayer)
  );

  const combinedGauges = {
    gauges: {
      data: { type: "FeatureCollection", features: [] },
      type: "geojson",
    },
  };

  propsGauges.forEach(gauge => {
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
        coordinates: [gauge.longitude, gauge.latitude],
      },
    };
    combinedGauges.gauges.data.features.push(assign({}, geometry, properties));
  });

  const mapStyle = defaultMapStyle
    .set(
      "sources",
      fromJS(assign({}, defaultMapStyle.get("sources").toJS(), combinedGauges))
    )
    .set("layers", newCombinedLayer);

  return mapStyle;
}
