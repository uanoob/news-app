import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToggleOpen from '../decorators/toggleOpen';
import Comment from '../containers/Comment';

class Comments extends Component {
  static defaultProps = {
    comments: [],
  };

  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
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

  render() {
    const { isOpen, toggleOpen } = this.props;
    return (
      <div>
        <button type="button" onClick={toggleOpen}>
          {isOpen ? 'Hide comments' : 'Show comments'}
        </button>
        {isOpen ? <ul>{this.getCommentsElement()}</ul> : null}
      </div>
    );
  }
}

export default ToggleOpen(Comments);
