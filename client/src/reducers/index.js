import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// water project
import guage from './guage';
import flowData from './flowData';
import user from './user';

const rootReducer = combineReducers({
  routing: routerReducer,

  //water project
  guage,
  flowData,
  user,
});

export default rootReducer;
