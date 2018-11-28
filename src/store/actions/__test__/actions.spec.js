import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async actions', () => {
  it(
    'creates GET_ALL_ARTICLES_SUCCESS'
      + ' when fetching articles has been done',
    async () => {
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
    },
  );
  it(
    'creates CREATE_ARTICLE_SUCCESS when create article has been done',
    async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {
        title: 'articleTitle',
        text: 'articleText',
        author_id: 'authorId',
        author_name: 'authorName',
      };

      mockAxios.post.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.CREATE_ARTICLE_START },
        { type: types.CREATE_ARTICLE_SUCCESS, payload: mockData },
        { type: types.GET_ARTICLES_BY_AUTHOR_ID_START },
      ];

      await store.dispatch(actions.createArticle());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    },
  );
});
