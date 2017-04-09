import * as types from './ActionTypes';
import UserApi from '../api/UserApi';
import Auth from '../modules/Auth';

export function fetchUserSuccess(user) {
  return { type: types.FETCH_USER_SUCCESS, user};
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user};
}

export function fetchUser(id) {
  return function (dispatch) {
    return UserApi.fetchUser(id).then(user => {
      dispatch(fetchUserSuccess(user));
      if (user) {
        return user;
      }
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateUser(user, id) {
  return function (dispatch) {
    return UserApi.updateUser(user, id).then(user => {
      dispatch(updateUserSuccess(user));
      if (user) {
        return user;
      }
    }).catch(error => {
      throw (error);
    });
  };
}
