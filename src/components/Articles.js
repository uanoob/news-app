import React from 'react';
import PropTypes from 'prop-types';
import Article from '../containers/Article';

const Articles = (props) => {
  const { articles } = props;
  const articleElements = articles.map(article => (
    <li key={article._id}>
      <Article article={article} />
    </li>
  ));
  return <ul>{articleElements}</ul>;
};

Articles.defaultProps = {
  articles: [],
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
};

export default Articles;
