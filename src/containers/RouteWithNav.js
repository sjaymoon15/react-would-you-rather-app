import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../components/Nav';

const RouteWithNav = ({ component: Component, ...rest }) => (
  <Route {...rest}>
    <Nav />
    <Component />
  </Route>
);

export default RouteWithNav;
