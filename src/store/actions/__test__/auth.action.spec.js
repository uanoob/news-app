import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('auth action creators', () => {
  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  describe(' AUTH_CHECK_STATE successful request', () => {
    it('call authCheckState()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();

      localStorage.setItem('token', 'test token');

      const mockData = { name: 'test name', email: 'test email' };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.AUTH_CHECK_STATE_START },
        { type: types.AUTH_CHECK_STATE_SUCCESS },
        { type: types.GET_USER_BY_TOKEN_START },
        { type: types.GET_USER_BY_TOKEN_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.authCheckState());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe(' AUTH_CHECK_STATE failure request', () => {
    it('call authCheckState()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();

      const mockData = { message: 'logout success' };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.AUTH_CHECK_STATE_START },
        { type: types.AUTH_CHECK_STATE_FAIL },
        { type: types.LOGOUT_START },
        { type: types.LOGOUT_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.authCheckState());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
