import { CountTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  count: 0,
  error: "",
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.CHANGE_COUNT_SUCCESS_OBJECT:
      return objectAssign({}, state, { count: state.count + action.number });

    case types.CHANGE_COUNT_ERROR_OBJECT:
      return objectAssign({}, state, { error: action.error });

    default:
      return state;
  }
}
