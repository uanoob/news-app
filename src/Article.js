import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Article extends Component {
  state = {
    isOpen: false,
  };

  toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { article } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <h3>{article.title}</h3>
        <button type="button" onClick={this.toggleOpen}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen ? <section>{article.text}</section> : null}
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
