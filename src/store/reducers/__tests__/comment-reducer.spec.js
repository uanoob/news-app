import commentReducer, { initialState } from '../comment.reducer';
import * as types from '../../actions/types';

describe('comment reducer', () => {
  describe('CREATE_COMMENT', () => {
    it('CREATE_COMMENT_START without error', () => {
      const action = {
        type: types.CREATE_COMMENT_START,
      };
      expect(commentReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        error: null,
        message: '',
      });
    });

    it('CREATE_COMMENT_SUCCESS', () => {
      const initialStateSuccess = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.CREATE_COMMENT_SUCCESS,
        payload: {
          _id: 'create success',
          text: 'create success',
          author_id: 'create success',
          author_name: 'create success',
          article_id: 'create success',
          created_at: 'create success',
          updated_at: 'create success',
        },
      };
      expect(commentReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        comment: action.payload,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('CREATE_COMMENT_FAIL', () => {
      const initialStateFail = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.CREATE_COMMENT_FAIL,
        payload: 'Error message',
      };
      expect(commentReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('UPDATE_COMMENT', () => {
    it('UPDATE_COMMENT_START without error', () => {
      const action = {
        type: types.UPDATE_COMMENT_START,
      };
      const initialStateWithoutError = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: false,
        loaded: false,
        error: null,
        message: '',
      };
      expect(commentReducer(initialStateWithoutError, action)).toEqual({
        ...initialStateWithoutError,
        loading: true,
        error: null,
        message: '',
      });
    });

    it('UPDATE_COMMENT_SUCCESS', () => {
      const initialStateSuccess = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.UPDATE_COMMENT_SUCCESS,
        payload: {
          _id: 'update success',
          text: 'update success',
          author_id: 'update success',
          author_name: 'update success',
          article_id: 'update success',
          created_at: 'update success',
          updated_at: 'update success',
        },
      };
      expect(commentReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        comment: action.payload,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('UPDATE_COMMENT_FAIL', () => {
      const initialStateFail = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.UPDATE_COMMENT_FAIL,
        payload: 'Error message',
      };
      expect(commentReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('DELETE_COMMENT', () => {
    it('DELETE_COMMENT_START without error', () => {
      const action = {
        type: types.DELETE_COMMENT_START,
      };
      const initialStateWithoutError = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: false,
        loaded: false,
        error: null,
        message: '',
      };
      expect(commentReducer(initialStateWithoutError, action)).toEqual({
        ...initialStateWithoutError,
        loading: true,
        error: null,
        message: '',
      });
    });

    it('DELETE_COMMENT_SUCCESS', () => {
      const initialStateSuccess = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.DELETE_COMMENT_SUCCESS,
        payload: 'article delete success',
      };
      expect(commentReducer(initialStateSuccess, action)).toEqual({
        ...initialStateSuccess,
        loading: false,
        loaded: true,
        error: null,
        message: action.payload,
      });
    });
    it('DELETE_COMMENT_FAIL', () => {
      const initialStateFail = {
        comment: {
          _id: '',
          text: '',
          author_id: '',
          author_name: '',
          article_id: '',
          created_at: '',
          updated_at: '',
        },
        loading: true,
        loaded: false,
        error: null,
        message: '',
      };
      const action = {
        type: types.DELETE_COMMENT_FAIL,
        payload: 'Error message',
      };
      expect(commentReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        loading: false,
        loaded: false,
        message: action.payload,
        error: action.payload,
      });
    });
  });
  describe('Default', () => {
    it('should return the initial state', () => {
      expect(commentReducer(undefined, {})).toEqual(initialState);
    });
  });
});
