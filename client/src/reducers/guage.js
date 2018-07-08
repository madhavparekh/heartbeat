import { GuageTypes as types } from '../action-types';
import objectAssign from 'object-assign';

const initialState = {
  guages: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GUAGE_OBJECTS:
      return objectAssign({}, state, { guages: action.guages });

    default:
      return state;
  }
}
