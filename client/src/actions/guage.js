import request from 'superagent';
import { GuageTypes as types } from '../action-types';

const fetchGuageObjects = (guages) => {
  return {
    type: types.FETCH_GUAGE_OBJECTS,
    guages,
  };
};

export function fetchGuages() {
  return async (dispatch) => {
    try {
      const guagesFromAPI = await request.get(
        `${process.env.REACT_APP_NODE_SERVER}/api/gauges`
      );
      // pretent this is an api call...
      dispatch(fetchGuageObjects(guagesFromAPI.body));
    } catch (e) {
      throw e;
    }
  };
}
