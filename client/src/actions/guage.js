import request from "superagent";
import { GuageTypes as types } from "../action-types";

const fetchGuageObjects = guages => {
  return {
    type: types.FETCH_GUAGE_OBJECTS,
    guages,
  };
};

const updateSelectedGaugeObject = currentSelectGauge => {
  return {
    type: types.UPDATE_SELECTED_GAUGE,
    currentSelectGauge,
  };
};

export function fetchGuages() {
  return async dispatch => {
    try {
      const guagesFromAPI = await request.get(
        `${process.env.REACT_APP_NODE_SERVER}/api/gauges`
      );
      dispatch(fetchGuageObjects(guagesFromAPI.body));
    } catch (e) {
      throw e;
    }
  };
}

export function updateSelectedGauge(gaugeId) {
  return dispatch => {
    try {
      dispatch(updateSelectedGaugeObject(gaugeId));
    } catch (e) {
      throw e;
    }
  };
}
