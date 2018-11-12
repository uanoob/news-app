import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from '../containers/Comment';

class Comments extends Component {
  state = {
    isOpen: false,
  };

  getCommentsElement = () => {
    const { comments } = this.props;
    return comments.length !== 0 ? (
      comments.map(comment => (
        <li key={comment._id}>
          <Comment comment={comment} />
        </li>
      ))
    ) : (
      <div>No comments yep</div>
    );
  };

  toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <button type="button" onClick={this.toggleOpen}>
          {isOpen ? 'Hide comments' : 'Show comments'}
        </button>
        {isOpen ? <ul>{this.getCommentsElement()}</ul> : null}
      </div>
    );
  }
}

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
};

export default Comments;
