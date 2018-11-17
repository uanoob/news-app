import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_USER_BY_TOKEN_START,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAIL,
} from '../actions/types';

const initialState = {
  user: null,
  token: null,
  auth: false,
  loading: false,
  loaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        auth: action.payload.auth,
        loading: false,
        loaded: true,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case LOGOUT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        auth: false,
        loading: false,
        loaded: true,
        error: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case GET_USER_BY_TOKEN_START:
      return {
        ...state,
        user: null,
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: null,
        auth: true,
        loading: false,
        loaded: true,
        error: null,
      };
    case GET_USER_BY_TOKEN_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
