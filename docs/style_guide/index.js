// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('App');
var TBD = require('TBD');
var Home = require('./Home');
var Design = require('./Design');
var Resources = require('./Resources');

var routes = (
  <Route name="app" path="/" handler={App}>
    {Design.routes()}
    <Route name="resources" handler={Resources} />
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

var router = Router.create({routes: routes});

router.run(function (Handler, state) {
  var factory = React.createFactory(Handler);
  var appElement = document.getElementById('app');
  React.render(factory(), appElement);
});
