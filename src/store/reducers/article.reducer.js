import {
  GET_ARTICLE_BY_ID_START,
  GET_ARTICLE_BY_ID_SUCCESS,
  GET_ARTICLE_BY_ID_FAIL,
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_START,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
} from '../actions/types';

const initialState = {
  article: {
    _id: '',
    title: '',
    text: '',
    author_id: '',
    author_name: '',
    posted_at: '',
  },
  loading: false,
  loaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_BY_ID_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_ARTICLE_BY_ID_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case GET_ARTICLE_BY_ID_FAIL:
      return {
        ...state,
        article: {
          _id: '',
          title: '',
          text: '',
          author_id: '',
          author_name: '',
          posted_at: '',
        },
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case CREATE_ARTICLE_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case CREATE_ARTICLE_FAIL:
      return {
        ...state,
        article: {
          _id: '',
          title: '',
          text: '',
          author_id: '',
          author_name: '',
          posted_at: '',
        },
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case UPDATE_ARTICLE_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case UPDATE_ARTICLE_FAIL:
      return {
        ...state,
        article: {
          _id: '',
          title: '',
          text: '',
          author_id: '',
          author_name: '',
          posted_at: '',
        },
        loading: false,
        loaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
