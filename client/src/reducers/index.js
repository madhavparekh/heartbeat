import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import todo from "./todo";
import count from "./count";

// water project
import guage from "./guage"

const rootReducer = combineReducers({
  routing: routerReducer,
  todo,
  count,
  
  //water project
  guage,
});

export default rootReducer;
