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
import { checkValidityLength } from '../utils/validator.utils';
import { createComment } from '../store/actions';

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

class CommentForm extends Component {
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
      userId,
      userName,
      handleDialogClick,
    } = this.props;
    const { comment } = this.state;
    onCreateComment(articleId, comment, userId, userName);
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
    const { classes, dialog, handleDialogClick } = this.props;
    const { comment, commentInputTouched, commentInputValid } = this.state;

    return (
      <Dialog
        open={dialog}
        onClose={handleDialogClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To leave a comment to this article, please enter your comment here.
          </DialogContentText>
          <TextField
            autoFocus
            id="outlined-multiline-flexible"
            label="Your comment here"
            multiline
            rows="4"
            value={comment}
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

CommentForm.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  articleId: PropTypes.string.isRequired,
  onCreateComment: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dialog: PropTypes.bool.isRequired,
  handleDialogClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
  userName: state.user.user.name,
});

const mapDispatchToProps = {
  onCreateComment: createComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentForm));
