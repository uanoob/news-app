import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import red from '@material-ui/core/colors/red';
import { deleteComment } from '../store/actions';
import CommentForm from './CommentForm';

const styles = theme => ({
  card: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Comment extends Component {
  state = {
    dialog: false,
  };

  handleDeleteComment = (commentId) => {
    const { onDeleteComment, comment } = this.props;
    onDeleteComment(commentId, comment.article_id);
  };

  handleDialogClick = () => {
    const { dialog } = this.state;
    this.setState({
      dialog: !dialog,
    });
  };

  render() {
    const { classes, comment, userId } = this.props;
    const { dialog } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <IconButton>
              <Avatar aria-label="Author" className={classes.avatar}>
                R
              </Avatar>
            </IconButton>
)}
          action={
            comment.author_id === userId ? (
              <div>
                <IconButton>
                  <EditIcon onClick={this.handleDialogClick} />
                </IconButton>
                <IconButton
                  type="button"
                  onClick={() => this.handleDeleteComment(comment._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : null
          }
          title={comment.author_name}
          subheader={comment.posted_at}
        />
        <CardContent>
          <Typography component="p">{comment.text}</Typography>
        </CardContent>
        <CommentForm
          articleId={comment.article_id}
          dialog={dialog}
          handleDialogClick={this.handleDialogClick}
          title="Edit a comment"
          description="Please edit your comment here."
          commentId={comment._id}
          commentText={comment.text}
        />
      </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    article_id: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
  message: state.comment.message,
});

const mapDispatchToProps = {
  onDeleteComment: deleteComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Comment));
