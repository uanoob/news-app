import { combineReducers } from 'redux';

import articles from './articles.reducer';
import comments from './comments.reducer';
import comment from './comment.reducer';

export default combineReducers({
  articles,
  comments,
  comment,
});
