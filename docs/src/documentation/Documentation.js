// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Documents = require('Documents');
var TBD = Documents.TBD;
var HelloWorld = require('./HelloWorld');
var DocumentFooter = require('DocumentFooter');
var MenuNavigation = require('MenuNavigation');

var contents = [
  {
    route: 'helloworld', label: 'Hello World'
  },
  {
    route: 'getstarted', label: 'Get Started'
  },
  {
    route: 'reference', label: 'Reference'
  },
  {
    route: 'architecture', label: 'Architecture'
  }
];

var Documentation = React.createClass({

  render: function() {

    var items = contents.map(function (content) {
      return <Link to={content.route}>{content.label}</Link>;
    });

    return (
      <div className="docs">
        <MenuNavigation items={items} />
        <RouteHandler />
        <DocumentFooter />
      </div>
    );
  }
});

Documentation.routes = function () {
  return (
    <Route name="documentation" handler={Documentation}>
      <DefaultRoute name="helloworld" handler={HelloWorld} />
      <Route name="getstarted" handler={TBD} />
      <Route name="reference" handler={TBD} />
      <Route name="architecture" handler={TBD} />
    </Route>
  );
};

module.exports = Documentation;
