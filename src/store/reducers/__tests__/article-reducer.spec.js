import articleReducer, { initialState } from '../article.reducer';
import * as types from '../../actions/types';

describe('article reducer', () => {
  describe('GET_ARTICLE_BY_ID', () => {
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
  });
  describe('CREATE_ARTICLE', () => {
    it('CREATE_ARTICLE_START without error', () => {
      const action = {
        type: types.CREATE_ARTICLE_START,
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

    it('CREATE_ARTICLE_SUCCESS', () => {
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
        type: types.CREATE_ARTICLE_SUCCESS,
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
    it('CREATE_ARTICLE_FAIL', () => {
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
        type: types.CREATE_ARTICLE_FAIL,
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
  });
  describe('UPDATE_ARTICLE', () => {
    it('UPDATE_ARTICLE_START without error', () => {
      const action = {
        type: types.UPDATE_ARTICLE_START,
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

    it('UPDATE_ARTICLE_SUCCESS', () => {
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
        type: types.UPDATE_ARTICLE_SUCCESS,
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
    it('UPDATE_ARTICLE_FAIL', () => {
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
        type: types.UPDATE_ARTICLE_FAIL,
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
  });
  describe('DELETE_ARTICLE', () => {
    it('DELETE_ARTICLE_START without error', () => {
      const action = {
        type: types.DELETE_ARTICLE_START,
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

    it('DELETE_ARTICLE_SUCCESS', () => {
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
        type: types.DELETE_ARTICLE_SUCCESS,
        payload: 'article delete success',
      };
      expect(articleReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        loading: false,
        loaded: true,
        error: null,
        message: action.payload,
      });
    });
    it('DELETE_ARTICLE_FAIL', () => {
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
        type: types.DELETE_ARTICLE_FAIL,
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
  });
  describe('CLEAR_ARTICLE', () => {
    it('CLEAR_ARTICLE_START without error', () => {
      const action = {
        type: types.CLEAR_ARTICLE_START,
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

    it('CLEAR_ARTICLE_SUCCESS', () => {
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
        type: types.CLEAR_ARTICLE_SUCCESS,
      };
      expect(articleReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        loading: false,
        loaded: true,
        error: null,
      });
    });
  });
  describe('Default', () => {
    it('should return the initial state', () => {
      expect(articleReducer(undefined, {})).toEqual(initialState);
    });
  });
});
