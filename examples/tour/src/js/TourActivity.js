// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Split = require('grommet/components/Split');
var Activity = require('grommet/components/index/Activity');
var IndexQuery = require('grommet/utils/IndexQuery');

var TourActivity = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSelect: function (selection) {
    var router = this.context.router;
    router.transitionTo('activity-resource', {splat: selection},
      router.getCurrentQuery());
  },

  _onQuery: function (query) {
    var router = this.context.router;
    var path = router.getCurrentPathname();
    router.replaceWith(path, {}, {q: query.fullText});
  },

  _setSelectionFromLocation: function () {
    var router = this.context.router;
    if (router.isActive('activity-resource')) {
      this.setState({selection: router.getCurrentParams().splat});
    } else {
      this.setState({selection: undefined});
    }
  },

  getInitialState: function () {
    return {query: null, selection: null};
  },

  componentWillMount: function () {
    var router = this.context.router;
    var queryText = router.getCurrentQuery().q;
    if (queryText) {
      this.setState({query: IndexQuery.create(queryText)});
    }
    this._setSelectionFromLocation();
  },

  componentWillReceiveProps: function () {
    this._setSelectionFromLocation();
  },

  render: function () {
    return (
      <Split>
        <Activity label="Activity"
          query={this.state.query}
          selection={this.state.selection}
          onSelect={this._onSelect}
          onQuery={this._onQuery} />
        <RouteHandler />
      </Split>
    );
  }

});

module.exports = TourActivity;
