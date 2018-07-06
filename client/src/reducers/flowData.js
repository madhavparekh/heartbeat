import { FlowTypes as types } from '../action-types';
import objectAssign from 'object-assign';

const initialState = {
  impaired: [],
  unImpaired: [],
  impairedAggr: [],
  unImpairedAggr: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_IMPAIRED_DATA:
      return objectAssign({}, state, { impaired: action.flow });
    case types.FETCH_UNIMPAIRED_DATA:
      return objectAssign({}, state, { unimpaired: action.flow });
    case types.FETCH_IMPAIRED_AGGR_DATA:
      return objectAssign({}, state, { impairedAggr: action.flow });
    case types.FETCH_UNIMPAIRED_AGGR_DATA:
      return objectAssign({}, state, { unImpairedAggr: action.flow });
    default:
      return state;
  }
}
