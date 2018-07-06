import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// water project
import guage from './guage';
import flowData from './flowData';

const rootReducer = combineReducers({
  routing: routerReducer,

  //water project
  guage,
  flowData,
});

export default rootReducer;
