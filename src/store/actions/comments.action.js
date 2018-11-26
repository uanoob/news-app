import axios from 'axios';

import {
  GET_ALL_COMMENTS_BY_ARTICLE_ID_START,
  GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS,
  GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL,
  CLEAR_COMMENTS_START,
  CLEAR_COMMENTS_SUCCESS,
} from './types';

const getAllCommentsStart = () => ({
  type: GET_ALL_COMMENTS_BY_ARTICLE_ID_START,
});

const getAllCommentsSuccess = comments => ({
  type: GET_ALL_COMMENTS_BY_ARTICLE_ID_SUCCESS,
  payload: comments,
});

const getAllCommentsFail = error => ({
  type: GET_ALL_COMMENTS_BY_ARTICLE_ID_FAIL,
  payload: error,
});

export const getAllCommentsByArticleId = articleId => (dispatch) => {
  dispatch(getAllCommentsStart());
  axios
    .get(`/comment/${articleId}`)
    .then((response) => {
      dispatch(getAllCommentsSuccess(response.data));
    })
    .catch((err) => {
      dispatch(getAllCommentsFail(err));
    });
};

const clearCommentsStart = () => ({
  type: CLEAR_COMMENTS_START,
});

const clearCommentsSuccess = () => ({
  type: CLEAR_COMMENTS_SUCCESS,
});

export const clearComments = () => (dispatch) => {
  dispatch(clearCommentsStart());
  dispatch(clearCommentsSuccess());
};
