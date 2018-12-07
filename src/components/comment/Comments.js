import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getAllCommentsByArticleId, clearComments } from '../../store/actions';
import Preloader from '../../containers/preloader/Preloader';
import Comment from './Comment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
});

export class CommentsComponent extends Component {
  state = {};

  componentDidMount() {
    const { onGetAllCommentsByArticleId, articleId } = this.props;
    onGetAllCommentsByArticleId(articleId);
  }

  componentWillUnmount() {
    const { onClearComments } = this.props;
    onClearComments();
  }

  render() {
    const {
      classes, comments, isLoading, isLoaded, errorMsg,
    } = this.props;
    return (
      <Fragment>
        {comments && comments.length !== 0 && (
          <div className={classes.root}>
            <List dense>
              {comments.map(comment => (
                <ListItem key={comment._id}>
                  <Comment comment={comment} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {isLoading && !isLoaded ? <Preloader /> : null}
        {isLoaded && !comments.length ? (
          <span id="comments-empty-message">No comments yep</span>
        ) : null}
        {errorMsg && <span id="comments-error-message">{errorMsg}</span>}
      </Fragment>
    );
  }
}

CommentsComponent.defaultProps = {
  comments: [],
  errorMsg: null,
};

CommentsComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      article_id: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }),
  ),
  onGetAllCommentsByArticleId: PropTypes.func.isRequired,
  onClearComments: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  isLoading: state.comments.loading,
  isLoaded: state.comments.loaded,
});

const mapDispatchToProps = {
  onGetAllCommentsByArticleId: getAllCommentsByArticleId,
  onClearComments: clearComments,
};

const Comments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentsComponent));

export default Comments;
