import axios from 'axios';

import {
  GET_ARTICLE_BY_ID_START,
  GET_ARTICLE_BY_ID_SUCCESS,
  GET_ARTICLE_BY_ID_FAIL,
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_START,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  DELETE_ARTICLE_START,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  CLEAR_ARTICLE_START,
  CLEAR_ARTICLE_SUCCESS,
} from './types';

import { getAllArticles, getArticlesByAuthorId } from '.';

const getArticleByIdStart = () => ({
  type: GET_ARTICLE_BY_ID_START,
});

const getArticleByIdSuccess = article => ({
  type: GET_ARTICLE_BY_ID_SUCCESS,
  payload: article,
});

const getArticleByIdFail = err => ({
  type: GET_ARTICLE_BY_ID_FAIL,
  payload: err,
});

export const getArticleById = articleId => (dispatch) => {
  dispatch(getArticleByIdStart());
  axios
    .get(`/article/${articleId}`)
    .then((response) => {
      dispatch(getArticleByIdSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getArticleByIdFail(error));
    });
};

const createArticleStart = () => ({
  type: CREATE_ARTICLE_START,
});

const createArticleSuccess = article => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: article,
});

const createArticleFail = error => ({
  type: CREATE_ARTICLE_FAIL,
  payload: error,
});

export const createArticle = (
  articleTitle,
  articleText,
  authorId,
  authorName,
) => (dispatch) => {
  dispatch(createArticleStart());
  const articleData = {
    title: articleTitle,
    text: articleText,
    author_id: authorId,
    author_name: authorName,
  };
  axios
    .post('/article', articleData)
    .then((response) => {
      dispatch(createArticleSuccess(response.data));
      dispatch(getArticlesByAuthorId(authorId));
    })
    .catch((err) => {
      dispatch(createArticleFail(err));
    });
};

const updateArticleStart = () => ({
  type: UPDATE_ARTICLE_START,
});

const updateArticleSuccess = article => ({
  type: UPDATE_ARTICLE_SUCCESS,
  payload: article,
});

const updateArticleFail = error => ({
  type: UPDATE_ARTICLE_FAIL,
  payload: error,
});

export const updateArticle = (
  articleId,
  articleTitle,
  articleText,
) => (dispatch) => {
  dispatch(updateArticleStart());
  const articleData = {
    title: articleTitle,
    text: articleText,
  };
  axios
    .put(`/article/${articleId}`, articleData)
    .then((response) => {
      dispatch(updateArticleSuccess(response.data));
      dispatch(getAllArticles());
    })
    .catch((err) => {
      dispatch(updateArticleFail(err));
    });
};

const deleteArticleStart = () => ({
  type: DELETE_ARTICLE_START,
});

const deleteArticleSuccess = message => ({
  type: DELETE_ARTICLE_SUCCESS,
  payload: message,
});

const deleteArticleFail = error => ({
  type: DELETE_ARTICLE_FAIL,
  payload: error,
});

export const deleteArticle = (articleId, authorId) => (dispatch) => {
  dispatch(deleteArticleStart());
  axios
    .delete(`/article/${articleId}`)
    .then((response) => {
      dispatch(deleteArticleSuccess(response.data));
      dispatch(getArticlesByAuthorId(authorId));
    })
    .catch((err) => {
      dispatch(deleteArticleFail(err));
    });
};

const clearArticleStart = () => ({
  type: CLEAR_ARTICLE_START,
});

const clearArticleSuccess = () => ({
  type: CLEAR_ARTICLE_SUCCESS,
});

export const clearArticle = () => (dispatch) => {
  dispatch(clearArticleStart());
  dispatch(clearArticleSuccess());
};
