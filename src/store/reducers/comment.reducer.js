import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from '../actions/types';

const initialState = {
  comment: null,
  loading: false,
  loaded: false,
  error: null,
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
    default:
      return state;
  }
}
