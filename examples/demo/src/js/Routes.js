// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var Ligo = require('ligo');
var App = Ligo.App;
var Login = Ligo.Login;
var TBD = Ligo.TBD;

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="login" handler={Login}/>
    <Route name="tbd" handler={TBD}/>
    <DefaultRoute name="dashboard" handler={TBD}/>
  </Route>
);

module.exports = routes;
