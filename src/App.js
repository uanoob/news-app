import React from 'react';
import './App.css';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './containers/MainPage';
import LoginForm from './components/LoginForm';

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginForm} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default withRouter(App);
