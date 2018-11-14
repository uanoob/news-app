import axios from 'axios';

import {
  GET_ALL_ARTICLES_START,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAIL,
} from './types';

const getAllArticlesStart = () => ({
  type: GET_ALL_ARTICLES_START,
});

export const getAllArticlesSuccess = articles => ({
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
