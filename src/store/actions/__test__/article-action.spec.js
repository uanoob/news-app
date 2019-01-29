import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async article action creators', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('CREATE_ARTICLE successful request', () => {
    it('call createArticle()', async () => {
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
    });
  });

  describe('UPDATE_ARTICLE successful request', () => {
    it('call updateArticle()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {
        title: 'updatedArticleTitle',
        text: 'updatedArticleText',
      };

      mockAxios.put.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.UPDATE_ARTICLE_START },
        { type: types.UPDATE_ARTICLE_SUCCESS, payload: mockData },
        { type: types.GET_ALL_ARTICLES_START },
      ];

      await store.dispatch(actions.updateArticle());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE_ARTICLE successful request', () => {
    it('call deleteArticle()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {};

      mockAxios.delete.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.DELETE_ARTICLE_START },
        { type: types.DELETE_ARTICLE_SUCCESS, payload: mockData },
        { type: types.GET_ARTICLES_BY_AUTHOR_ID_START },
      ];

      await store.dispatch(actions.deleteArticle());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET_ARTICLE_BY_ID successful request', () => {
    it('call getArticleById()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {};

      mockAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.GET_ARTICLE_BY_ID_START },
        { type: types.GET_ARTICLE_BY_ID_SUCCESS, payload: mockData },
      ];

      await store.dispatch(actions.getArticleById());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe(' CLEAR_ARTICLE successful request', () => {
    it('call clearArticle()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();

      const expectedActions = [
        { type: types.CLEAR_ARTICLE_START },
        { type: types.CLEAR_ARTICLE_SUCCESS },
      ];

      await store.dispatch(actions.clearArticle());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
