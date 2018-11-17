import {
  AUTH_CHECK_STATE_START,
  AUTH_CHECK_STATE_SUCCESS,
  AUTH_CHECK_STATE_FAIL,
} from './types';

import { getUserByToken, logout } from '.';

const authCheckStateStart = () => ({
  type: AUTH_CHECK_STATE_START,
});

export const authCheckStateSuccess = () => ({
  type: AUTH_CHECK_STATE_SUCCESS,
});

const authCheckStateFail = () => ({
  type: AUTH_CHECK_STATE_FAIL,
});

export const authCheckState = () => (dispatch) => {
  dispatch(authCheckStateStart());
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(authCheckStateFail());
    dispatch(logout());
  } else {
    dispatch(authCheckStateSuccess());
    dispatch(getUserByToken());
  }
};
