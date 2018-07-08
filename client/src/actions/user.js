import request from 'superagent';
import { UserTypes as types } from '../action-types';

export function signUpUser(name, email, password) {
  return async (dispatch) => {
    try {
      localStorage.removeItem('HBT_TOKEN');
      localStorage.removeItem('HBT_USER_NAME');
      request
        .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/signin`)
        .send(name, email, password)
        .end((err, res) => {
          if (err) throw err;
          if (res.body.success) {
            localStorage.setItem('HBT_TOKEN', res.body.token);
            localStorage.setItem('HBT_USER_NAME', res.body.name);
            dispatch({
              success: true,
              type: types.USER_AUTH,
              msg: res.body.message,
              route: res.body.reroute,
            });
          } else {
            dispatch({
              success: false,
              type: types.USER_ERROR,
              msg: res.body.message,
              route: res.body.reroute,
            });
          }
        });
    } catch (e) {
      throw e;
    }
  };
}

export function logInUser(email, password) {
  return async (dispatch) => {
    try {
      localStorage.removeItem('HBT_TOKEN');
      localStorage.removeItem('HBT_USER_NAME');
      request
        .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/login`)
        .send({ email, password })
        .end((err, res) => {
          if (err) throw err;
          if (res.body.success) {
            localStorage.setItem('HBT_TOKEN', res.body.token);
            localStorage.setItem('HBT_USER_NAME', res.body.name);
            dispatch({
              success: true,
              type: types.USER_AUTH,
              msg: res.body.message,
              route: res.body.reroute,
            });
            window.location.href = res.body.reroute;
          } else {
            dispatch({
              success: false,
              type: types.USER_ERROR,
              msg: res.body.message,
              route: res.body.reroute,
            });
          }
        });
    } catch (e) {
      throw e;
    }
  };
}

export function logOutUser() {
  return async (dispatch) => {
    try {
      localStorage.removeItem('HBT_TOKEN');
      localStorage.removeItem('HBT_USER_NAME');
      request
        .get(`${process.env.REACT_APP_NODE_SERVER}/api/users/logout`)
        .then((err, res) => {
          dispatch({
            success: false,
            type: types.USER_UNAUTH,
            msg: res.body.message,
            route: res.body.reroute,
          });
        });
    } catch (e) {
      throw e;
    }
  };
}

export function uploadRoute() {
  return function(dispatch) {
    try {
      if (localStorage.getItem('HTB_TOKEN')) {
        request
          .get(`${process.env.REACT_APP_NODE_SERVER}/api/users/upload`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('HTB_TOKEN')}`,
            },
          })
          .then((err, res) => {
            if (res.body.success) {
              dispatch({
                success: true,
                type: types.USER_UPLOAD,
                msg: res.body.message,
                route: res.body.reroute,
              });
            } else {
              dispatch({
                success: false,
                type: types.USER_ERROR,
                msg: res.body.message,
                route: res.body.reroute,
              });
            }
          });
      } else {
        dispatch({
          type: types.USER_ERROR,
          msg: 'Please login',
          route: '/login',
        });
      }
    } catch (e) {
      throw e;
    }
  };
}
