import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async user action creators', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('LOGIN successful request', () => {
    it('to be called login()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { email: 'test email', password: 'test password' };

      mockAxios.post.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.LOGIN_START },
        { type: types.LOGIN_SUCCESS, payload: mockData },
        { type: types.GET_USER_BY_TOKEN_START },
      ];

      await store.dispatch(actions.login());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('LOGOUT successful request', () => {
    it('to be called logout()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { message: 'logout success' };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.LOGOUT_START },
        { type: types.LOGOUT_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.logout());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('SIGNUP successful request', () => {
    it('to be called signUp()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {
        name: 'test name',
        email: 'test email',
        password: 'test password',
      };

      mockAxios.post.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.SIGNUP_START },
        { type: types.SIGNUP_SUCCESS, payload: mockData },
        { type: types.GET_USER_BY_TOKEN_START },
      ];

      await store.dispatch(actions.signUp());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
  });
  describe('GET_USER_BY_TOKEN successful request', () => {
    it('to be called getUserByToken()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { name: 'test name', email: 'test email' };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.GET_USER_BY_TOKEN_START },
        { type: types.GET_USER_BY_TOKEN_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.getUserByToken());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
