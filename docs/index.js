// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Document = require('Document');
var TBD = require('TBD');
var Home = require('./Home');
var StyleGuide = require('./style_guide/StyleGuide');
var Downloads = require('./Downloads');

var menuConfig = [
  {route: 'style guide', label: 'Style Guide'},
  {route: 'demo', label: 'Demo'},
  {route: 'documentation', label: 'Documentation'},
  {route: 'downloads', label: 'Downloads'}
];

var routes = (
  <Route name="doc" path="/" handler={Document}>
    {StyleGuide.routes()}
    <Route name="demo" handler={Downloads} />
    <Route name="documentation" handler={Downloads} />
    <Route name="downloads" handler={Downloads} />
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

var router = Router.create({routes: routes});

router.run(function (Handler, state) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('doc');
  React.render(factory({menuConfig: menuConfig}), element);
});
