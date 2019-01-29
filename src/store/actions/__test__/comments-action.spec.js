import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async comments action creators', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET_ALL_COMMENTS_BY_ARTICLE_ID successful request', () => {
    it('to be called getAllCommentsByArticleId()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = { data: [1, 2, 3] };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_START },
        {
          type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS,
          payload: mockData,
        },
      ];

      await store.dispatch(actions.getAllCommentsByArticleId());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe(' CLEAR_COMMENTS successful request', () => {
    it('call clearComments()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();

      const expectedActions = [
        { type: types.CLEAR_COMMENTS_START },
        { type: types.CLEAR_COMMENTS_SUCCESS },
      ];

      await store.dispatch(actions.clearComments());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
