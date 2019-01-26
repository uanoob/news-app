import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Send from '@material-ui/icons/Send';
import { checkValidityLength } from '../../utils/validator.utils';
import { createComment, updateComment } from '../../store/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

export class CommentFormComponent extends Component {
  state = {
    comment: '',
    commentInputTouched: false,
    commentInputValid: false,
  };

  handleTextInput = (e) => {
    this.setState({
      comment: e.target.value,
      commentInputTouched: true,
      commentInputValid: checkValidityLength('comment', e.target.value),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      articleId,
      onCreateComment,
      onUpdateComment,
      userId,
      userName,
      handleDialogClick,
      commentId,
    } = this.props;
    const { comment } = this.state;
    if (!commentId) {
      onCreateComment(articleId, comment, userId, userName);
    } else {
      onUpdateComment(articleId, comment, commentId);
    }
    this.clearTextField();
    handleDialogClick();
  };

  handleCancelClick = () => {
    const { handleDialogClick } = this.props;
    this.clearTextField();
    handleDialogClick();
  };

  clearTextField = () => {
    this.setState({
      comment: '',
      commentInputTouched: false,
      commentInputValid: false,
    });
  };

  render() {
    const {
      classes,
      dialog,
      handleDialogClick,
      title,
      description,
      commentText,
    } = this.props;
    const { comment, commentInputTouched, commentInputValid } = this.state;

    return (
      <Dialog
        open={dialog}
        onClose={handleDialogClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            id="comment-textfield-input"
            label="Your comment here"
            multiline
            rows="4"
            value={comment || commentText}
            onChange={event => this.handleTextInput(event)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            error={!commentInputValid && commentInputTouched}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button
            id="comment-submit-button"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            onClick={this.handleSubmit}
            disabled={!commentInputValid}
          >
            Send
            <Send className={classes.rightIcon}>send</Send>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CommentFormComponent.defaultProps = {
  commentId: '',
  commentText: '',
};

CommentFormComponent.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  articleId: PropTypes.string.isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dialog: PropTypes.bool.isRequired,
  handleDialogClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  commentId: PropTypes.string,
  commentText: PropTypes.string,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
  userName: state.user.user.name,
});

const mapDispatchToProps = {
  onCreateComment: createComment,
  onUpdateComment: updateComment,
};

const CommentForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentFormComponent));

export default CommentForm;
