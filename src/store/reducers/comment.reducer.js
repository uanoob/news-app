import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  UPDATE_COMMENT_START,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
} from '../actions/types';

export const initialState = {
  comment: null,
  loading: false,
  loaded: false,
  error: null,
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case DELETE_COMMENT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload,
        error: null,
      };
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        message: action.payload,
        error: action.payload,
      };
    case UPDATE_COMMENT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
