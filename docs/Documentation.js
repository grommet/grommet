// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Documents = require('Documents');
var Document = Documents.Document;
var TBD = Documents.TBD;

var Documentation = React.createClass({
  render: function() {
    var contents = [
      {section: 'Guides', contents: [
        (<Link to="hello world">Hello World</Link>),
        (<Link to="get started">Get Started</Link>)
      ]},
      {section: 'Reference', contents: [
        (<Link to="search ref">Search</Link>)
      ]}
    ];
    return (
      <Document contents={contents}>
        <RouteHandler />
      </Document>
    );
  }
});

Documentation.routes = function () {
  return (
    <Route name="documentation" handler={Documentation}>
      <DefaultRoute name="hello world" handler={TBD} />
      <Route name="get started" handler={TBD} />
      <Route name="search ref" path="search" handler={TBD} />
    </Route>
  );
}

module.exports = Documentation;
