import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  state = {};

  render() {
    const { comment } = this.props;
    return (
      <div>
        <strong>{comment.user}</strong>
        <br />
        {comment.text}
        <br />
        {comment.date}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
