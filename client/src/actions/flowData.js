import request from 'superagent';

import { FlowTypes as types } from '../action-types';

const fetchImpairedData = (flow) => {
  return {
    type: types.FETCH_IMPAIRED_DATA,
    flow,
  };
};

const fetchUnImpairedData = (flow) => {
  return {
    type: types.FETCH_UNIMPAIRED_DATA,
    flow,
  };
};

const fetchUnImpairedAggrData = (flow) => {
  return {
    type: types.FETCH_UNIMPAIRED_AGGR_DATA,
    flow,
  };
};

const fetchImpairedAggrData = (flow) => {
  return {
    type: types.FETCH_IMPAIRED_AGGR_DATA,
    flow,
  };
};

const fetchImpairedData = (flow) => {
  return {
    type: types.FETCH_IMPAIRED_DATA,
    flow,
  };
};

export function fetchFlowData() {
  return async (dispatch) => {
    try {
      const guagesFromAPI = await request.get('/api/gauges');
      // pretent this is an api call...
      dispatch(fetchGuageObjects(guagesFromAPI.body));
    } catch (e) {
      throw e;
    }
  };
}
