import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

class Article extends Component {
  static propTypes = {
    article: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      posted_at: PropTypes.string.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { article, isOpen, toggleOpen } = this.props;
    // console.log('---', 'render article');
    return (
      <div>
        <h3>{article.title}</h3>
        <button type="button" onClick={toggleOpen}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen ? (
          <section>
            <p>{article.text}</p>
            <Comments articleId={article._id} />
          </section>
        ) : null}
      </div>
    );
  }
}

export default Article;
