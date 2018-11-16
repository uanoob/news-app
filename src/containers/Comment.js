import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div>
      <strong>{comment.author_name}</strong>
      <br />
      {comment.text}
      <br />
      {comment.posted_at}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    article_id: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
