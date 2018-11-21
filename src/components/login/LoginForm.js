import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  checkValidityLength,
  checkValidityEmail,
} from '../../utils/validator.utils';
import { login } from '../../store/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class LoginForm extends React.Component {
  state = {
    email: '',
    emailTouched: false,
    emailIsValid: false,
    password: '',
    passwordTouched: false,
    passwordIsValid: false,
  };

  handleChange = name => (event) => {
    const touched = `${name}Touched`;
    const isValid = `${name}IsValid`;
    const checkValidity = () => {
      if (name === 'email') {
        return checkValidityEmail(event.target.value);
      }
      return checkValidityLength(name, event.target.value);
    };
    this.setState({
      [name]: event.target.value,
      [touched]: true,
      [isValid]: checkValidity(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    onLogin(email, password);
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      emailTouched,
      emailIsValid,
      password,
      passwordTouched,
      passwordIsValid,
    } = this.state;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={this.handleChange('email')}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          error={!emailIsValid && emailTouched}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          value={password}
          onChange={this.handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          error={!passwordIsValid && passwordTouched}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!(emailIsValid && passwordIsValid)}
        >
          Login
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(LoginForm));
