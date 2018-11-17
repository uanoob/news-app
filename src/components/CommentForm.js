import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { checkValidityLength } from '../utils/validator.utils';
import './CommentForm.css';
import { createComment } from '../store/actions';

class CommentForm extends Component {
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    onCreateComment: PropTypes.func.isRequired,
  };

  state = {
    authorId: '5bed63f4ad3be324495971f9',
    authorName: 'bred',
    text: '',
    textInputTouched: false,
    textInputValid: false,
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
    const { articleId, onCreateComment } = this.props;
    const { text, authorId, authorName } = this.state;
    onCreateComment(articleId, text, authorId, authorName);
  };

  render() {
    const { text, textInputTouched, textInputValid } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="text-input">
            Text
            <input
              id="text-input"
              type="input"
              name="text"
              placeholder="Enter your comment"
              value={text}
              onChange={event => this.handleTextInput(event)}
              className={classNames({
                'input-error': !textInputValid && textInputTouched,
              })}
            />
          </label>
          <button type="submit" onClick={this.handleSubmit}>
            Send Comment
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comment: state.comment.comment,
});

const mapDispatchToProps = {
  onCreateComment: createComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentForm);
