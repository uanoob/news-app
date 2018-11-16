import {
  GET_ALL_COMMENTS_BY_ARTICLE_ID_START,
  GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS,
  GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL,
} from '../actions/types';

const initialState = {
  comments: [],
  loading: false,
  loaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS_BY_ARTICLE_ID_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL:
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
