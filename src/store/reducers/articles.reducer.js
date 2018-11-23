import {
  GET_ALL_ARTICLES_START,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAIL,
  GET_ARTICLES_BY_AUTHOR_ID_START,
  GET_ARTICLES_BY_AUTHOR_ID_SUCCESS,
  GET_ARTICLES_BY_AUTHOR_ID_FAIL,
  CLEAR_ARTICLES_START,
  CLEAR_ARTICLES_SUCCESS,
} from '../actions/types';

const initialState = {
  articles: [],
  loading: false,
  loaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLES_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_ALL_ARTICLES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case GET_ARTICLES_BY_AUTHOR_ID_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_ARTICLES_BY_AUTHOR_ID_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case GET_ARTICLES_BY_AUTHOR_ID_FAIL:
      return {
        ...state,
        articles: [],
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case CLEAR_ARTICLES_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case CLEAR_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [],
        loading: false,
        loaded: true,
        error: null,
      };
    default:
      return state;
  }
}
