import { combineReducers } from 'redux';

import articles from './articles.reducer';
import comments from './comments.reducer';
import comment from './comment.reducer';
import user from './user.reducer';

export default combineReducers({
  articles,
  comments,
  comment,
  user,
});
