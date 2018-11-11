import React from 'react';

const Article = props => {
  const { article } = props;
  return (
    <div>
      <h3>{article.title}</h3>
      <section>{article.text}</section>
    </div>
  );
};

export default Article;
