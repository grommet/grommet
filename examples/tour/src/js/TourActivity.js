// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Activity = require('grommet/components/index/Activity');

var TourActivity = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSelect: function (selection) {
    this.context.router.transitionTo('alert', {splat: selection});
  },

  render: function () {
    return (
      <div>
        <Activity onSelect={this._onSelect} />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = TourActivity;
