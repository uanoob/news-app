import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllCommentsByArticleId } from '../store/actions';
import toggler from '../decorators/toggler';
import Comment from '../containers/Comment';
import CommentForm from './CommentForm';

class Comments extends Component {
  static defaultProps = {
    comments: [],
  };

  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        article_id: PropTypes.string.isRequired,
        posted_at: PropTypes.string.isRequired,
      }),
    ),
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    onGetAllCommentsByArticleId: PropTypes.func.isRequired,
    articleId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { onGetAllCommentsByArticleId, articleId } = this.props;
    onGetAllCommentsByArticleId(articleId);
  }

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
    const { isOpen, toggleOpen, articleId } = this.props;
    // console.log('---', 'render comments list');
    return (
      <div>
        <CommentForm articleId={articleId} />
        <button type="button" onClick={toggleOpen}>
          {isOpen ? 'Hide comments' : 'Show comments'}
        </button>
        {isOpen ? <ul>{this.getCommentsElement()}</ul> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  onGetAllCommentsByArticleId: getAllCommentsByArticleId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toggler(Comments));
