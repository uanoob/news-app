import userReducer, { initialState } from '../user.reducer';
import * as types from '../../actions/types';

describe('user reducer', () => {
  describe('LOGIN', () => {
    it('LOGIN_START without error', () => {
      const action = {
        type: types.LOGIN_START,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        loaded: false,
        error: null,
      });
    });

    it('LOGIN_SUCCESS', () => {
      const action = {
        type: types.LOGIN_SUCCESS,
        payload: {
          token: 'test_token',
          auth: true,
        },
      };

      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        token: action.payload.token,
        auth: action.payload.auth,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('LOGIN_FAIL', () => {
      const initialStateFail = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.LOGIN_FAIL,
        payload: 'Error message',
      };
      expect(userReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('SIGNUP', () => {
    it('SIGNUP_START without error', () => {
      const action = {
        type: types.SIGNUP_START,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        loaded: false,
        error: null,
      });
    });

    it('SIGNUP_SUCCESS', () => {
      const action = {
        type: types.SIGNUP_SUCCESS,
        payload: {
          token: 'test_token',
          auth: true,
        },
      };

      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        token: action.payload.token,
        auth: action.payload.auth,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('SIGNUP_FAIL', () => {
      const initialStateFail = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.SIGNUP_FAIL,
        payload: 'Error message',
      };
      expect(userReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('LOGOUT', () => {
    it('LOGOUT_START without error', () => {
      const action = {
        type: types.LOGOUT_START,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
        loaded: false,
        error: null,
      });
    });

    it('LOGOUT_SUCCESS', () => {
      const action = {
        type: types.LOGOUT_SUCCESS,
        payload: {
          data: 'logout_success',
        },
      };

      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('LOGOUT_FAIL', () => {
      const initialStateFail = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.LOGOUT_FAIL,
        payload: 'Error message',
      };
      expect(userReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('GET_USER_BY_TOKEN', () => {
    it('GET_USER_BY_TOKEN_START without error', () => {
      const action = {
        type: types.GET_USER_BY_TOKEN_START,
      };
      const initialStateWithoutError = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: null,
      };
      expect(userReducer(initialStateWithoutError, action)).toEqual({
        ...initialStateWithoutError,
        loading: true,
        loaded: false,
        error: null,
      });
    });
    it('GET_USER_BY_TOKEN_SUCCESS', () => {
      const initialStateSuccess = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_USER_BY_TOKEN_SUCCESS,
        payload: {
          _id: 'success-id',
          name: 'success-name',
          email: 'success-email',
          password: 'success-password',
          created_at: 'success-created_at',
          updated_at: 'success-updated_at',
        },
      };
      expect(userReducer(initialStateSuccess, action)).toEqual({
        ...initialState,
        user: action.payload,
        auth: true,
        loading: false,
        loaded: true,
        error: null,
      });
    });
    it('GET_USER_BY_TOKEN_FAIL', () => {
      const initialStateFail = {
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: true,
        loaded: false,
        error: null,
      };
      const action = {
        type: types.GET_USER_BY_TOKEN_FAIL,
        payload: 'Error message',
      };
      expect(userReducer(initialStateFail, action)).toEqual({
        ...initialStateFail,
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          created_at: '',
          updated_at: '',
        },
        token: null,
        auth: false,
        loading: false,
        loaded: false,
        error: action.payload,
      });
    });
  });
  describe('Default', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual(initialState);
    });
  });
});
