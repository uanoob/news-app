import { createSelector } from 'reselect';

const articlesGetter = state => state.articles.articles;

const articlesSelector = createSelector(
  articlesGetter,
  articles => articles,
);

export default articlesSelector;
