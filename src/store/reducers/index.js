import { combineReducers } from 'redux';

import articles from './articles.reducer';
import article from './article.reducer';
import comments from './comments.reducer';
import comment from './comment.reducer';
import user from './user.reducer';

export default combineReducers({
  articles,
  article,
  comments,
  comment,
  user,
});
