import { GuageTypes as types } from "../action-types";
import objectAssign from "object-assign";

const initialState = {
  guages: [],
  currentSelectGauge: "08251500",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GUAGE_OBJECTS:
      return objectAssign({}, state, { guages: action.guages });

    case types.UPDATE_SELECTED_GAUGE:
      return objectAssign({}, state, {
        currentSelectGauge: action.currentSelectGauge,
      });

    default:
      return state;
  }
}
