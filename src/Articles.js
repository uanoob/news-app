import React from 'react';
import Article from './Article';

const Articles = props => {
  const { articles } = props;
  const articleElements = articles.map(article => (
    <li key={article._id}>
      <Article article={article} />
    </li>
  ));
  return <ul>{articleElements}</ul>;
};

export default Articles;
