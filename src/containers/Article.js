import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comments from '../components/Comments';
import { getCommentById } from '../api';

class Article extends Component {
  static propTypes = {
    article: PropTypes.shape({
      comments: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
  };

  state = {
    comments: [],
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const { article } = this.props;
    const arr = [];
    if (article.comments.length !== 0) {
      article.comments.map(async (id) => {
        const comment = await getCommentById(id);
        arr.push(comment);
      });
    }
    return this.setState({
      comments: arr,
    });
  };

  render() {
    const { article, isOpen, toggleOpen } = this.props;
    const { comments } = this.state;
    return (
      <div>
        <h3>{article.title}</h3>
        <button type="button" onClick={toggleOpen}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen ? (
          <section>
            <p>{article.text}</p>
            <Comments comments={comments} />
          </section>
        ) : null}
      </div>
    );
  }
}

export default Article;
