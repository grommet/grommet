// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Activity = require('grommet/components/index/Activity');
var IndexQuery = require('grommet/utils/IndexQuery');

var TourActivity = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSelect: function (selection) {
    this.context.router.transitionTo('alert', {splat: selection});
  },

  _onQuery: function (query) {
    var path = this.context.router.getCurrentPathname();
    this.context.router.replaceWith(path, {}, {q: query.fullText});
  },

  getInitialState: function () {
    return {query: null};
  },

  componentWillMount: function () {
    var queryText = this.context.router.getCurrentQuery().q;
    if (queryText) {
      this.setState({query: IndexQuery.create(queryText)});
    }
  },

  render: function () {
    return (
      <div>
        <Activity query={this.state.query}
          onSelect={this._onSelect}
          onQuery={this._onQuery} />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = TourActivity;
