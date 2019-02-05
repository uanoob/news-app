import articlesReducer, { initialState } from '../articles.reducer';
import * as types from '../../actions/types';

describe('articles reducer', () => {
  describe('GET_ALL_ARTICLES', () => {
    it('GET_ALL_ARTICLES_START without error', () => {
      const action = {
        type: types.GET_ALL_ARTICLES_START,
      };
      expect(articlesReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    it('GET_ALL_ARTICLES_SUCCESS', () => {
      const initialStateSuccess = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_ALL_ARTICLES_SUCCESS,
        payload: [
          {
            _id: 'success',
            title: 'success',
            text: 'success',
            author_id: 'success',
            author_name: 'success',
            created_at: 'success',
            updated_at: 'success',
          },
        ],
      };
      expect(articlesReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        articles: action.payload,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('GET_ALL_ARTICLES_FAIL', () => {
      const initialStateFail = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
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
        type: types.GET_ALL_ARTICLES_FAIL,
        payload: 'Error message',
      };
      expect(articlesReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('GET_ARTICLES_BY_AUTHOR_ID', () => {
    it('GET_ARTICLES_BY_AUTHOR_ID_START without error', () => {
      const action = {
        type: types.GET_ARTICLES_BY_AUTHOR_ID_START,
      };
      const initialStateWithoutError = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
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

    it('GET_ARTICLES_BY_AUTHOR_ID_SUCCESS', () => {
      const initialStateSuccess = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_ARTICLES_BY_AUTHOR_ID_SUCCESS,
        payload: [
          {
            _id: 'success',
            title: 'success',
            text: 'success',
            author_id: 'success',
            author_name: 'success',
            created_at: 'success',
            updated_at: 'success',
          },
        ],
      };
      expect(articlesReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        articles: action.payload,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('GET_ARTICLES_BY_AUTHOR_ID_FAIL', () => {
      const initialStateFail = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_ARTICLES_BY_AUTHOR_ID_FAIL,
        payload: 'Error message',
      };
      expect(articlesReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        articles: [],
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('CLEAR_ARTICLES', () => {
    it('CLEAR_ARTICLES_START without error', () => {
      const action = {
        type: types.CLEAR_ARTICLES_START,
      };
      const initialStateWithoutError = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
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

    it('CLEAR_ARTICLES_SUCCESS', () => {
      const initialStateSuccess = {
        articles: [
          {
            _id: '',
            title: '',
            text: '',
            author_id: '',
            author_name: '',
            created_at: '',
            updated_at: '',
          },
        ],
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.CLEAR_ARTICLES_SUCCESS,
      };
      expect(articlesReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
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
