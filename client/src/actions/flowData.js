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

const updateCurrentFlowDataObj = (name) => {
  return { type: types.UPDATE_CURRENT_FLOW_DATA,
    name,
   };
}

export function fetchImpairedData(gauge_id) {
  return async (dispatch) => {
    try {
      const impairedData = await request.get(
        `${process.env.REACT_APP_NODE_SERVER}/api/impaired/gauge/${gauge_id}`
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
        `${process.env.REACT_APP_NODE_SERVER}/api/unimpaired/gauge/${gauge_id}`
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
        `${
          process.env.REACT_APP_NODE_SERVER
        }/api/unimpairedaggregate/gauge/${gauge_id}`
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
        `${
          process.env.REACT_APP_NODE_SERVER
        }/api/impairedaggregate/gauge/${gauge_id}`
      );
      dispatch(fetchImpairedAggrDataObj(impairedAggrData.body));
    } catch (e) {
      throw e;
    }
  };

  
}

export function updateCurrentFlowDataName(name) {
  return (dispatch) => {
    try {
     
      dispatch(updateCurrentFlowDataObj(name));
    } catch (e) {
      throw e;
    }
  };


}
