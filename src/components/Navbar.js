import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logout } from '../store/actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

class Navbar extends Component {
  state = {};

  handleLogout = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  showToolbar = () => {
    const { classes, isAuthenticated, userId } = this.props;
    return !isAuthenticated ? (
      <div>
        <Link className={classes.link} to="/login">
          <Button color="inherit">Login</Button>
        </Link>
        <Link className={classes.link} to="/register">
          <Button color="inherit">Register</Button>
        </Link>
      </div>
    ) : (
      <div>
        <Link className={classes.link} to="/">
          <Button color="inherit">Main</Button>
        </Link>
        <Link className={classes.link} to={`/author/${userId}`}>
          <Button color="inherit">My Page</Button>
        </Link>
        <Button color="inherit" onClick={this.handleLogout}>
          Logout
        </Button>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className={classnames(classes.grow, classes.link)}>
              <Button color="inherit">News</Button>
            </Link>
            {this.showToolbar()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.defaultProps = {
  userId: '',
};

Navbar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    grow: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth,
  userId: state.user._id,
});

const mapDispatchToProps = {
  onLogout: logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Navbar));
