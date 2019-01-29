import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '..';
import * as types from '../types';

describe('async comment action creators', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('CREATE_COMMENT successful request', () => {
    it('call createComment()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {
        text: 'articleText',
        author_id: 'authorId',
        author_name: 'authorName',
      };

      mockAxios.post.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.CREATE_COMMENT_START },
        { type: types.CREATE_COMMENT_SUCCESS, payload: mockData },
        { type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_START },
      ];

      await store.dispatch(actions.createComment());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('UPDATE_COMMENT successful request', () => {
    it('call updateComment()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {
        text: 'updatedCommentText',
      };

      mockAxios.put.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.UPDATE_COMMENT_START },
        { type: types.UPDATE_COMMENT_SUCCESS, payload: mockData },
        { type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_START },
      ];

      await store.dispatch(actions.updateComment());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE_COMMENT successful request', () => {
    it('call deleteComment()', async () => {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore();
      const mockData = {};

      mockAxios.delete.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: types.DELETE_COMMENT_START },
        { type: types.DELETE_COMMENT_SUCCESS, payload: mockData },
        { type: types.GET_ALL_COMMENTS_BY_ARTICLE_ID_START },
      ];

      await store.dispatch(actions.deleteComment());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
