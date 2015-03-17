// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var Book = require('Book');
var Philosophy = require('./Philosophy');
var Basics = require('./Basics');
var Patterns = require('./Patterns');
var Login = require('./Login');
var TBDDetails = require('TBDDetails');

var CONTENTS = [
  {label: 'Philosophy', route: 'philosophy', handler: Philosophy},
  {label: 'Basics', route: 'basics', handler: Basics},
  {label: 'Patterns', route: 'patterns', handler: Patterns}
];

var Design = React.createClass({

  render: function() {
    return (
      <Book contents={CONTENTS} />
    );
  }

});

Design.routes = function () {
  return (
    <Route name="design" handler={Design}>
      <DefaultRoute name="philosophy" handler={Philosophy} />
      <Route name="basics" handler={Basics} />
      <Route name="patterns" handler={Patterns}>
        <Route name="login" handler={Login} />
        <Route name="header" handler={TBDDetails} />
        <Route name="dashboard" handler={TBDDetails} />
        <Route name="search" handler={TBDDetails} />
        <Route name="filter" handler={TBDDetails} />
      </Route>
    </Route>
  );
}

module.exports = Design;
