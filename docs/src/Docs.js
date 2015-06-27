// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var RouteHandler = require('react-router').RouteHandler;

var Docs = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <App className="docs">
        <RouteHandler />
      </App>
    );
  }

});

module.exports = Docs;
