import articleReducer, { initialState } from '../article.reducer';
import * as types from '../../actions/types';

describe('article reducer', () => {
  it('GET_ARTICLE_BY_ID_START without error', () => {
    const action = {
      type: types.GET_ARTICLE_BY_ID_START,
    };
    const initialStateWithoutError = {
      article: {
        _id: '',
        title: '',
        text: '',
        author_id: '',
        author_name: '',
        created_at: '',
        updated_at: '',
      },
      loading: false,
      loaded: false,
      error: null,
      message: '',
    };
    expect(articleReducer(initialStateWithoutError, action)).toEqual({
      ...initialStateWithoutError,
      loading: true,
      error: null,
      message: '',
    });
  });
  it('GET_ARTICLE_BY_ID_START after error', () => {
    const action = {
      type: types.GET_ARTICLE_BY_ID_START,
    };
    const initialStateWithError = {
      article: {
        _id: '',
        title: '',
        text: '',
        author_id: '',
        author_name: '',
        created_at: '',
        updated_at: '',
      },
      loading: false,
      loaded: false,
      error: 'Unknown error',
      message: 'Unknown error',
    };
    expect(articleReducer(initialStateWithError, action)).toEqual({
      ...initialStateWithError,
      loading: true,
      error: null,
      message: '',
    });
  });
  it('GET_ARTICLE_BY_ID_SUCCESS', () => {
    const initialStateSuccess = {
      article: {
        _id: '',
        title: '',
        text: '',
        author_id: '',
        author_name: '',
        created_at: '',
        updated_at: '',
      },
      loading: true,
      loaded: false,
      error: null,
      message: '',
    };
    const action = {
      type: types.GET_ARTICLE_BY_ID_SUCCESS,
      payload: {
        _id: 'success',
        title: 'success',
        text: 'success',
        author_id: 'success',
        author_name: 'success',
        created_at: 'success',
        updated_at: 'success',
      },
    };
    expect(articleReducer(initialStateSuccess, action)).toEqual({
      ...initialState,
      article: action.payload,
      loading: false,
      loaded: true,
      error: null,
    });
  });
  it('GET_ARTICLE_BY_ID_FAIL', () => {
    const initialStateFail = {
      article: {
        _id: '',
        title: '',
        text: '',
        author_id: '',
        author_name: '',
        created_at: '',
        updated_at: '',
      },
      loading: true,
      loaded: false,
      error: null,
      message: '',
    };
    const action = {
      type: types.GET_ARTICLE_BY_ID_FAIL,
      payload: 'Error message',
    };
    expect(articleReducer(initialStateFail, action)).toEqual({
      ...initialStateFail,
      article: {
        _id: '',
        title: '',
        text: '',
        author_id: '',
        author_name: '',
        created_at: '',
        updated_at: '',
      },
      loading: false,
      loaded: false,
      error: action.payload,
    });
  });
  it('should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(initialState);
  });
});
