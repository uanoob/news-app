import {
  GET_ALL_ARTICLES_START,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAIL,
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
    default:
      return state;
  }
}
