import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getAllCommentsByArticleId } from '../../store/actions';
import Comment from './Comment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Comments extends Component {
  state = {};

  componentDidMount() {
    const { onGetAllCommentsByArticleId, articleId } = this.props;
    onGetAllCommentsByArticleId(articleId);
  }

  render() {
    const { classes, comments } = this.props;
    return (
      <div className={classes.root}>
        <List dense>
          {comments.length !== 0 ? (
            comments.map(comment => (
              <ListItem key={comment._id}>
                <Comment comment={comment} />
              </ListItem>
            ))
          ) : (
            <div>No comments yep</div>
          )}
        </List>
      </div>
    );
  }
}

Comments.defaultProps = {
  comments: [],
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
      posted_at: PropTypes.string.isRequired,
    }),
  ),
  onGetAllCommentsByArticleId: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  onGetAllCommentsByArticleId: getAllCommentsByArticleId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Comments));
