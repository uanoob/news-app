import axios from 'axios';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_USER_BY_TOKEN_START,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAIL,
} from './types';

const logoutStart = () => ({
  type: LOGOUT_START,
});

const logoutSuccess = data => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});

const logoutFail = err => ({
  type: LOGIN_FAIL,
  payload: err,
});

export const logout = () => (dispatch) => {
  dispatch(logoutStart());
  axios
    .get('/logout')
    .then((response) => {
      dispatch(logoutSuccess(response.data));
      localStorage.removeItem('token');
    })
    .catch((error) => {
      dispatch(logoutFail(error));
    });
};

const getUserByTokenStart = () => ({
  type: GET_USER_BY_TOKEN_START,
});

export const getUserByTokenSuccess = user => ({
  type: GET_USER_BY_TOKEN_SUCCESS,
  payload: user,
});

const getUserByTokenFail = err => ({
  type: GET_USER_BY_TOKEN_FAIL,
  payload: err,
});

export const getUserByToken = () => (dispatch) => {
  dispatch(getUserByTokenStart());
  const token = localStorage.getItem('token');
  const config = {
    headers: { 'x-access-token': token },
  };
  axios
    .get('/user', config)
    .then((response) => {
      dispatch(getUserByTokenSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getUserByTokenFail(error.response.data));
      dispatch(logout());
    });
};

const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

const loginFail = err => ({
  type: LOGOUT_FAIL,
  payload: err,
});

export const login = (email, password) => (dispatch) => {
  dispatch(loginStart());
  const loginData = {
    email,
    password,
  };
  axios
    .post('/login', loginData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data));
      dispatch(getUserByToken());
    })
    .catch(error => dispatch(loginFail(error)));
};

const signUpStart = () => ({
  type: SIGNUP_START,
});

const signUpSuccess = token => ({
  type: SIGNUP_SUCCESS,
  payload: token,
});

const signUpFail = err => ({
  type: SIGNUP_FAIL,
  payload: err,
});

export const signUp = (name, email, password) => (dispatch) => {
  dispatch(signUpStart());
  const signUpData = {
    name,
    email,
    password,
  };
  axios
    .post('/auth', signUpData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(signUpSuccess(response.data));
      dispatch(getUserByToken());
    })
    .catch((error) => {
      dispatch(signUpFail(error));
    });
};
