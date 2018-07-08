import { UserTypes as types } from '../action-types';
import objectAssign from 'object-assign';

const initialState = {
  success: false,
  msg: '',
  route: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_AUTH:
      return objectAssign({}, state, {
        success: action.success,
        msg: action.msg,
        route: action.route,
      });
    case types.USER_UNAUTH:
      return objectAssign({}, state, {
        success: action.success,
        msg: action.msg,
        route: action.route,
      });
    case types.USER_ERROR:
      return objectAssign({}, state, {
        success: action.success,
        msg: action.msg,
        route: action.route,
      });
    case types.USER_UPLOAD:
      return objectAssign({}, state, {
        success: action.success,
        msg: action.msg,
        route: action.route,
      });

    default:
      return state;
  }
}
