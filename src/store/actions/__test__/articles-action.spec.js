import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async articles action creators', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET_ALL_ARTICLES successful request', () => {
    it('to be called getAllArticles()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { data: [1, 2, 3] };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.GET_ALL_ARTICLES_START },
        { type: types.GET_ALL_ARTICLES_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.getAllArticles());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET_ARTICLES_BY_AUTHOR_ID successful request', () => {
    it('to be called getArticlesByAuthorId()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { data: [1, 2, 3] };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.GET_ARTICLES_BY_AUTHOR_ID_START },
        { type: types.GET_ARTICLES_BY_AUTHOR_ID_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.getArticlesByAuthorId());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe(' CLEAR_ARTICLES successful request', () => {
    it('call clearArticles()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();

      const expectedActions = [
        { type: types.CLEAR_ARTICLES_START },
        { type: types.CLEAR_ARTICLES_SUCCESS },
      ];

      await store.dispatch(actions.clearArticles());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
