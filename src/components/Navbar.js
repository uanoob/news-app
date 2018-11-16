import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classnames(classes.grow, classes.link)}>
              <Button color="inherit">
                News
              </Button>
            </Link>
            <Link to="/login" className={classes.link}>
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    grow: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Navbar);
