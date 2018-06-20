import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import todo from "./todo";
import count from "./count";

const rootReducer = combineReducers({
  routing: routerReducer,
  todo,
  count,
});

export default rootReducer;
