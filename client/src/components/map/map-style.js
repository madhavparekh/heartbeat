import { fromJS } from "immutable";

import MAP_STYLE from "../../constants/map-style.json";

export const defaultMapStyle = fromJS(MAP_STYLE);

export const gaugeLayer = fromJS({
  id: "gauges",
  source: "gauges",
  type: "circle",
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: "visible",
  },
  paint: {
    "circle-radius": {
      base: 3,
      stops: [[5, 3.5], [7, 5.5]],
    },
    "circle-stroke-color": "#fafafa",
    "circle-stroke-width": 1,
    "circle-color": "#03a9f4",
  },
});
