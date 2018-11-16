import axios from 'axios';

import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from './types';

import { getAllCommentsByArticleId } from '.';

const createCommentStart = () => ({
  type: CREATE_COMMENT_START,
});

export const createCommentSuccess = comment => ({
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
      // console.log(response.data);
      dispatch(createCommentSuccess(response.data));
      dispatch(getAllCommentsByArticleId(articleId));
    })
    .catch((error) => {
      dispatch(createCommentFail(error));
    });
};
