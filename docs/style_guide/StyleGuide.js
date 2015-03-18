// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Philosophy = require('./Philosophy');
var Basics = require('./Basics');
var Patterns = require('./Patterns');
var Login = require('./Login');
var Documents = require('Documents');
var Document = Documents.Document;
var TBD = Documents.TBD;

var CONTENTS = [
  {label: 'Philosophy', route: 'philosophy', handler: Philosophy},
  {label: 'Basics', route: 'basics', handler: Basics},
  {label: 'Patterns', route: 'patterns', handler: Patterns}
];

var StyleGuide = React.createClass({
  render: function() {
    var contents = [
      {section: (<Link to="introduction">Introduction</Link>)},
      {section: (<Link to="philosophy">Philosophy</Link>)},
      {section: (<Link to="basics">Basics</Link>)},
      {section: (<Link to="patterns">Patterns</Link>), contents: [
        (<Link to="login">Login</Link>),
        (<Link to="header">Header</Link>),
        (<Link to="dashboard">Dashboard</Link>),
        (<Link to="search">Search</Link>)
      ]}
    ];
    return (
      <Document contents={contents}>
        <RouteHandler />
      </Document>
    );
  }
});

StyleGuide.routes = function () {
  return (
    <Route name="style guide" path="styleguide" handler={StyleGuide}>
      <Route name="introduction" handler={TBD} />
      <DefaultRoute name="philosophy" handler={Philosophy} />
      <Route name="basics" handler={Basics} />
      <Route name="patterns" handler={Patterns}>
        <Route name="login" handler={Login} />
        <Route name="header" handler={TBD} />
        <Route name="dashboard" handler={TBD} />
        <Route name="search" handler={TBD} />
        <Route name="filter" handler={TBD} />
      </Route>
    </Route>
  );
}

module.exports = StyleGuide;
