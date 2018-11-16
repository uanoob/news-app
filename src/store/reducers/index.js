import { combineReducers } from 'redux';

import articles from './articles.reducer';
import comments from './comments.reducer';

export default combineReducers({
  articles,
  comments,
});
