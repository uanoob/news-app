import articlesReducer, { initialState } from '../comments.reducer';
import * as types from '../../actions/types';

describe('comments reducer', () => {
  describe('GET_ALL_COMMENTS_BY_ARTICLE_ID', () => {
    it('GET_ALL_COMMENTS_BY_ARTICLE_ID_START without error', () => {
      const action = {
        type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_START,
      };
      expect(articlesReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    it('GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS', () => {
      const initialStateSuccess = {
        comments: [
          {
            _id: '',
            text: '',
            author_id: '',
            author_name: '',
            article_id: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS,
        payload: [
          {
            _id: 'get comments success',
            text: 'get comments success',
            author_id: 'get comments success',
            author_name: 'get comments success',
            article_id: 'get comments success',
            created_at: 'get comments success',
            updated_at: 'get comments success',
          },
        ],
      };
      expect(articlesReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        comments: action.payload,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL', () => {
      const initialStateFail = {
        comments: [
          {
            _id: '',
            text: '',
            author_id: '',
            author_name: '',
            article_id: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL,
        payload: 'Error message',
      };
      expect(articlesReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('CLEAR_COMMENTS', () => {
    it('CLEAR_COMMENT_START without error', () => {
      const action = {
        type: types.CLEAR_COMMENTS_START,
      };
      const initialStateWithoutError = {
        comments: [
          {
            _id: '',
            text: '',
            author_id: '',
            author_name: '',
            article_id: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: false,
        loaded: false,
        error: null,
      };
      expect(articlesReducer(initialStateWithoutError, action)).toEqual({
        ...initialStateWithoutError,
        loading: true,
        error: null,
      });
    });

    it('CLEAR_COMMENTS_SUCCESS', () => {
      const initialStateSuccess = {
        comments: [
          {
            _id: '',
            text: '',
            author_id: '',
            author_name: '',
            article_id: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.CLEAR_COMMENTS_SUCCESS,
      };
      expect(articlesReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        comments: [],
        loading: false,
        loaded: true,
        error: null,
      });
    });
  });
  describe('Default', () => {
    it('should return the initial state', () => {
      expect(articlesReducer(undefined, {})).toEqual(initialState);
    });
  });
});
