import React, { Component } from 'react';
import classNames from 'classnames';

import checkValidity from '../utils/validator.utils';
import './CommentForm.css';
import { createComment } from '../api/index';

class CommentForm extends Component {
  state = {
    user: '',
    userInputTouched: false,
    userInputValid: false,
    text: '',
    textInputTouched: false,
    textInputValid: false,
  };

  handleUserInput = (e) => {
    this.setState({
      user: e.target.value,
      userInputTouched: true,
      userInputValid: checkValidity('user', e.target.value),
    });
  };

  handleTextInput = (e) => {
    this.setState({
      text: e.target.value,
      textInputTouched: true,
      textInputValid: checkValidity('text', e.target.value),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, text } = this.state;
    createComment(user, text);
  };

  render() {
    const {
      user,
      userInputTouched,
      userInputValid,
      text,
      textInputTouched,
      textInputValid,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="user-input">
            Name
            <input
              id="user-input"
              type="input"
              name="user"
              placeholder="Enter you name"
              value={user}
              onChange={event => this.handleUserInput(event)}
              className={
                !userInputValid && userInputTouched ? 'input-error' : ''
              }
            />
          </label>
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

export default CommentForm;
