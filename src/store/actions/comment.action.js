import axios from 'axios';

import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  UPDATE_COMMENT_START,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
} from './types';

import { getAllCommentsByArticleId } from '.';

const createCommentStart = () => ({
  type: CREATE_COMMENT_START,
});

const createCommentSuccess = comment => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment,
});

const createCommentFail = err => ({
  type: CREATE_COMMENT_FAIL,
  payload: err,
});

export const createComment = (
  articleId,
  text,
  authorId,
  authorName,
) => (dispatch) => {
  dispatch(createCommentStart());
  const commentData = {
    text,
    author_id: authorId,
    author_name: authorName,
  };
  axios
    .post(`/comment/${articleId}`, commentData)
    .then((response) => {
      dispatch(createCommentSuccess(response.data));
      dispatch(getAllCommentsByArticleId(articleId));
    })
    .catch((error) => {
      dispatch(createCommentFail(error));
    });
};

const deleteCommentStart = () => ({
  type: DELETE_COMMENT_START,
});

const deleteCommentSuccess = message => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: message,
});

const deleteCommentFail = error => ({
  type: DELETE_COMMENT_FAIL,
  payload: error,
});

export const deleteComment = (commentId, articleId) => (dispatch) => {
  dispatch(deleteCommentStart());
  axios
    .delete(`/comment/${commentId}`)
    .then((response) => {
      dispatch(deleteCommentSuccess(response.data));
      dispatch(getAllCommentsByArticleId(articleId));
    })
    .catch((err) => {
      dispatch(deleteCommentFail(err));
    });
};

const updateCommentStart = () => ({
  type: UPDATE_COMMENT_START,
});

const updateCommentSuccess = comment => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment,
});

const updateCommentFail = error => ({
  type: UPDATE_COMMENT_FAIL,
  payload: error,
});

export const updateComment = (articleId, comment, commentId) => (dispatch) => {
  dispatch(updateCommentStart());
  const commentData = {
    text: comment,
  };
  axios
    .put(`/comment/${commentId}`, commentData)
    .then((response) => {
      dispatch(updateCommentSuccess(response.data));
      dispatch(getAllCommentsByArticleId(articleId));
    })
    .catch((err) => {
      dispatch(updateCommentFail(err));
    });
};
