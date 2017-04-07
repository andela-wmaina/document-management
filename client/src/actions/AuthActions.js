import * as types from './ActionTypes';
import AuthApi from '../api/AuthApi';
import Auth from '../modules/Auth';

export function registerUsersSuccess(user) {
  return { type: types.REGISTER_USER_SUCCESS, user };
}

export function loginUsersSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function logoutUserSuccess(user) {
  return { type: types.LOGOUT_USER_SUCCESS, user };
}

export function registerUser(user) {
  return function (dispatch) {
    return AuthApi.registerUser(user).then(user => {
      dispatch(registerUsersSuccess(user));
      if (user) {
        return user;
      }
    }).catch(error => {
      throw (error);
    });
  };
}

export function loginUser(user) {
  return function (dispatch) {
    return AuthApi.loginUser(user).then(user => {
      dispatch(loginUsersSuccess(user));
      if (user) {
          return user;
        }
      })
      .catch(error => {
        throw (error);
      });
  };
}

export function logoutUser(user) {
  return function (dispatch) {
    return AuthApi.logoutUser(user)
      .then(res => {
        dispatch(logoutUserSuccess(res));
        if (res) {
          return res;
        }
      })
      .catch(error => {
        throw (error);
      });
  };
}
