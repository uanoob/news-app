import React from 'react';
import PropTypes from 'prop-types';
import Article from '../containers/Article';
import accordion from '../decorators/accordion';

const Articles = (props) => {
  const { articles, openItemId, toggleOpenItem } = props;
  const articleElements = articles.map(article => (
    <li key={article._id}>
      <Article
        article={article}
        isOpen={article._id === openItemId}
        toggleOpen={() => toggleOpenItem(article._id)}
      />
    </li>
  ));
  return <ul>{articleElements}</ul>;
};

Articles.defaultProps = {
  articles: [],
  openItemId: null,
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
  toggleOpenItem: PropTypes.func.isRequired,
  openItemId: PropTypes.string,
};

export default accordion(Articles);
