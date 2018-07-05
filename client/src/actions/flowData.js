import request from 'superagent';

import { FlowTypes as types } from '../action-types';

const fetchImpairedDataObj = (flow) => {
  return {
    type: types.FETCH_IMPAIRED_DATA,
    flow,
  };
};

const fetchUnImpairedDataObj = (flow) => {
  return {
    type: types.FETCH_UNIMPAIRED_DATA,
    flow,
  };
};

const fetchUnImpairedAggrDataObj = (flow) => {
  return {
    type: types.FETCH_UNIMPAIRED_AGGR_DATA,
    flow,
  };
};

const fetchImpairedAggrDataObj = (flow) => {
  return {
    type: types.FETCH_IMPAIRED_AGGR_DATA,
    flow,
  };
};

export function fetchImpairedData(gauge_id) {
  return async (dispatch) => {
    try {
      const impairedData = await request.get(
        `http://localhost:3001/api/impaired/gauge/${gauge_id}`
      );
      dispatch(fetchImpairedDataObj(impairedData.body));
    } catch (e) {
      throw e;
    }
  };
}

export function fetchUnImpairedData(gauge_id) {
  return async (dispatch) => {
    try {
      const unImpairedData = await request.get(
        `http://localhost:3001/api/unimpaired/gauge/${gauge_id}`
      );
      dispatch(fetchUnImpairedDataObj(unImpairedData.body));
    } catch (e) {
      throw e;
    }
  };
}

export function fetchUnImpairedAggrData(gauge_id) {
  return async (dispatch) => {
    try {
      const unImpairedAggrData = await request.get(
        `http://localhost:3001/api/unimpairedaggregate/gauge/${gauge_id}`
      );
      dispatch(fetchUnImpairedAggrDataObj(unImpairedAggrData.body));
    } catch (e) {
      throw e;
    }
  };
}

export function fetchImpairedAggrData(gauge_id) {
  return async (dispatch) => {
    try {
      const impairedAggrData = await request.get(
        `http://localhost:3001/api/impairedaggregate/gauge/${gauge_id}`
      );
      dispatch(fetchImpairedAggrDataObj(impairedAggrData.body));
    } catch (e) {
      throw e;
    }
  };
}
