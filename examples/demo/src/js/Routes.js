// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var App = require('./TodoApp');
var TodoDashboard = require('./TodoDashboard');

var routes = (
  <Route name="todoapp" path="/" handler={App}>
    <DefaultRoute name="dashboard" handler={TodoDashboard}/>
  </Route>
);

module.exports = routes;
