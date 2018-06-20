import request from "superagent";

import { TodoTypes as types } from "../action-types";

const fetchTodoObjects = todos => {
  return {
    type: types.FETCH_TODO_OBJECTS,
    todos,
  };
};

export function fetchTodos() {
  return async dispatch => {
    try {
      const todosFromAPI = await request.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      // pretent this is an api call...
      dispatch(fetchTodoObjects(todosFromAPI.body));
    } catch (e) {
      throw e;
    }
  };
}
