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

class Comments extends Component {
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
        <div className={classes.root}>
          <List dense>
            {comments
              && comments.length !== 0
              && comments.map(comment => (
                <ListItem key={comment._id}>
                  <Comment comment={comment} />
                </ListItem>
              ))}
            {isLoading && !isLoaded ? (
              <Preloader />
            ) : (
              <div>No comments yep</div>
            )}
            {errorMsg && <div>{errorMsg}</div>}
          </List>
        </div>
      </Fragment>
    );
  }
}

Comments.defaultProps = {
  comments: [],
  errorMsg: null,
};

Comments.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Comments));
