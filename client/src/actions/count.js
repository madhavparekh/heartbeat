import { CountTypes as types } from "../action-types";

const changeCountSuccessObject = number => {
  return {
    type: types.CHANGE_COUNT_SUCCESS_OBJECT,
    number,
  };
};

const changeCountErrorObject = error => {
  return {
    type: types.CHANGE_COUNT_ERROR_OBJECT,
    error,
  };
};

export function changeCount(count) {
  return dispatch => {
    try {
      // ----- api call goes here! to get count or whatever!
      dispatch(changeCountSuccessObject(count));
    } catch (e) {
      dispatch(changeCountErrorObject("You did something wrong!"));
    }
  };
}
