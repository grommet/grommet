// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Split = require('grommet/components/Split');
var Activity = require('grommet/components/index/Activity');
var IndexQuery = require('grommet/utils/IndexQuery');
var Title = require('grommet/components/Title');
var Logo = require('./MediumLogo');

var MediumActivity = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
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

  _onSelect: function (selection) {
    var router = this.context.router;
    router.transitionTo('activity resource', {splat: selection},
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

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive) {
      this.setState({showMain: true});
    }
    if ('single' === responsive) {
      this.setState({showMain: false});
    }
  },

  _renderActivity: function (navControl) {
    return (
    <Activity label="Activity"
      query={this.state.query}
      selection={this.state.selection}
      onSelect={this._onSelect}
      onQuery={this._onQuery}
      navControl={navControl} />
    );
  },

  render: function () {
    var navControl = null;
    if (this.props.onMain) {
      navControl = (
        <Title onClick={this.props.onMain}>
          <Logo />
        </Title>
      );
    }

    var resourceRouted = this.context.router.getCurrentRoutes().length >= 4;
    var pane1;
    var pane2;

    if ('single' === this.state.responsive) {
      if (resourceRouted) {
        pane1 = <RouteHandler />;
      } else {
        pane1 = this._renderActivity(navControl);
      }
    } else {
      pane1 = this._renderActivity(navControl);
      pane2 = <RouteHandler />;
    }

    return (
      <Split onResponsive={this._onResponsive} flex="left">
        {pane1}
        {pane2}
      </Split>
    );
  }

});

module.exports = MediumActivity;
