import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MainPage from './containers/MainPage';
import LoginForm from './components/login/LoginForm';
import { authCheckState } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { onAuthCheckState } = this.props;
    onAuthCheckState();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Redirect to="/login" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Redirect to="/main" />
        </Switch>
      );
    }
    return (
      <Fragment>
        <Navbar />
        {routes}
      </Fragment>
    );
  }
}

App.propTypes = {
  onAuthCheckState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth,
});

const mapDispatchToProps = {
  onAuthCheckState: authCheckState,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
