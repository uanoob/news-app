import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      handleModalClick,
    } = this.props;
    const { comment } = this.state;
    onCreateComment(articleId, comment, userId, userName);
    handleModalClick();
  };

  render() {
    const { classes } = this.props;
    const { comment, commentInputTouched, commentInputValid } = this.state;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
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
          />
          <div>
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
          </div>
        </form>
      </div>
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
  handleModalClick: PropTypes.func.isRequired,
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
