import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from '../containers/Comment';

class Comments extends Component {
  state = {
    isOpenComments: false,
  };

  getCommentsElement = () => {
    const { comments } = this.props;
    return comments.map(comment => (
      <li key={comment._id}>
        <Comment comment={comment} />
      </li>
    ));
  };

  toggleOpen = () => {
    const { isOpenComments } = this.state;
    this.setState({
      isOpenComments: !isOpenComments,
    });
  };

  render() {
    const { isOpenComments } = this.state;
    return (
      <div>
        <button type="button" onClick={this.toggleOpen}>
          {isOpenComments ? 'Hide comments' : 'Show comments'}
        </button>
        {isOpenComments ? <ul>{this.getCommentsElement()}</ul> : null}
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
