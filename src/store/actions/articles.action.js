import axios from 'axios';

import {
  GET_ALL_ARTICLES_START,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAIL,
  GET_ARTICLES_BY_AUTHOR_ID_START,
  GET_ARTICLES_BY_AUTHOR_ID_SUCCESS,
  GET_ARTICLES_BY_AUTHOR_ID_FAIL,
} from './types';

const getAllArticlesStart = () => ({
  type: GET_ALL_ARTICLES_START,
});

const getAllArticlesSuccess = articles => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload: articles,
});

const getAllArticlesFail = error => ({
  type: GET_ALL_ARTICLES_FAIL,
  payload: error,
});

export const getAllArticles = () => (dispatch) => {
  dispatch(getAllArticlesStart());
  axios
    .get('/article')
    .then((response) => {
      dispatch(getAllArticlesSuccess(response.data));
    })
    .catch((err) => {
      dispatch(getAllArticlesFail(err));
    });
};

const getArticlesByAuthorIdStart = () => ({
  type: GET_ARTICLES_BY_AUTHOR_ID_START,
});

const getArticlesByAuthorIdSuccess = articles => ({
  type: GET_ARTICLES_BY_AUTHOR_ID_SUCCESS,
  payload: articles,
});

const getArticlesByAuthorIdFail = err => ({
  type: GET_ARTICLES_BY_AUTHOR_ID_FAIL,
  payload: err,
});

export const getArticlesByAuthorId = authorId => (dispatch) => {
  dispatch(getArticlesByAuthorIdStart());
  axios
    .get(`/article/author/${authorId}`)
    .then((response) => {
      dispatch(getArticlesByAuthorIdSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getArticlesByAuthorIdFail(error));
    });
};
