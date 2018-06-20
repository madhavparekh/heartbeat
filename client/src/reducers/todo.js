import { TodoTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  todos: [],
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_TODO_OBJECTS:
      return objectAssign({}, state, { todos: action.todos });

    default:
      return state;
  }
}
