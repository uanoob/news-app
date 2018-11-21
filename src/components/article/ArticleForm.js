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
import { checkValidityLength } from '../../utils';
import { createArticle, updateArticle } from '../../store/actions';

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

class ArticleForm extends Component {
  state = {
    title: '',
    titleInputTouched: false,
    titleInputValid: false,
    text: '',
    textInputTouched: false,
    textInputValid: false,
  };

  handleTitleInput = (e) => {
    this.setState({
      title: e.target.value,
      titleInputTouched: true,
      titleInputValid: checkValidityLength('title', e.target.value),
    });
  };

  handleTextInput = (e) => {
    this.setState({
      text: e.target.value,
      textInputTouched: true,
      textInputValid: checkValidityLength('text', e.target.value),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      articleId,
      onCreateArticle,
      onUpdateArticle,
      userId,
      userName,
      handleDialogClick,
    } = this.props;
    const { title, text } = this.state;
    if (!articleId) {
      onCreateArticle(title, text, userId, userName);
    } else {
      onUpdateArticle(articleId, title, text, articleId);
    }
    this.clearInputField();
    handleDialogClick();
  };

  handleCancelClick = () => {
    const { handleDialogClick } = this.props;
    this.clearInputField();
    handleDialogClick();
  };

  clearInputField = () => {
    this.setState({
      title: '',
      titleInputTouched: false,
      titleInputValid: false,
      text: '',
      textInputTouched: false,
      textInputValid: false,
    });
  };

  render() {
    const {
      classes,
      articleTitle,
      articleText,
      dialog,
      handleDialogClick,
      header,
      description,
    } = this.props;
    const {
      title,
      titleInputTouched,
      titleInputValid,
      text,
      textInputTouched,
      textInputValid,
    } = this.state;

    return (
      <Dialog
        open={dialog}
        onClose={handleDialogClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            id="article-title"
            label="Title article here"
            value={title || articleTitle}
            onChange={event => this.handleTitleInput(event)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            error={!titleInputValid && titleInputTouched}
            fullWidth
          />
          <TextField
            id="article-text"
            label="Text article here"
            multiline
            rows="10"
            value={text || articleText}
            onChange={event => this.handleTextInput(event)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            error={!textInputValid && textInputTouched}
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
            disabled={!titleInputValid}
          >
            Send
            <Send className={classes.rightIcon}>send</Send>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ArticleForm.defaultProps = {
  articleId: '',
  articleTitle: '',
  articleText: '',
};

ArticleForm.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  articleId: PropTypes.string,
  onCreateArticle: PropTypes.func.isRequired,
  onUpdateArticle: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dialog: PropTypes.bool.isRequired,
  handleDialogClick: PropTypes.func.isRequired,
  articleTitle: PropTypes.string,
  articleText: PropTypes.string,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
  userName: state.user.user.name,
});

const mapDispatchToProps = {
  onCreateArticle: createArticle,
  onUpdateArticle: updateArticle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ArticleForm));
