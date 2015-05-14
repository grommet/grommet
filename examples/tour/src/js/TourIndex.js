// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var merge = require('lodash/object/merge');
var Split = require('grommet/components/Split');
var Index = require('grommet/components/index/Index');
var IndexQuery = require('grommet/utils/IndexQuery');
var Rest = require('grommet/utils/Rest');
var Actions = require('grommet/actions/Actions');

var TourIndex = React.createClass({

  propTypes: {
    manageData: React.PropTypes.bool,
    resourceRoute: React.PropTypes.string,
    selectionRoute: React.PropTypes.string,
    options: React.PropTypes.shape({
      label: React.PropTypes.string,
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        header: React.PropTypes.bool,
        index: React.PropTypes.number,
        label: React.PropTypes.string,
        size: React.PropTypes.string,
        timestamp: React.PropTypes.bool
      })),
      view: React.PropTypes.oneOf(["table", "tiles"]),
      params: React.PropTypes.shape({
        category: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]),
        query: React.PropTypes.object
      })
    }),
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSelect: function (selection) {
    var router = this.context.router;
    router.transitionTo(this.props.selectionRoute, {splat: selection},
      router.getCurrentQuery());
  },

  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', result: {}});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, result: {}});
    } else {
      var result = res.body;
      this.setState({result: result, error: null});
    }
  },

  _getData: function () {
    var params = merge({}, this.state.options.params);
    if (params.query && (typeof params.query === 'object')) {
      params.query = params.query.fullText;
    }
    Rest.get('/rest/index/resources', params).end(this._onResponse);
  },

  _onQuery: function (query) {
    var options = merge(this.state.options, {params: {query: query}});
    var getData;
    if (this.props.manageData) {
      getData = this._getData;
    }
    this.setState({options: options}, getData);
    var path = this.context.router.getCurrentPathname();
    this.context.router.replaceWith(path, {}, {q: query.fullText});
  },

  _setSelectionFromLocation: function () {
    var router = this.context.router;
    if (router.isActive(this.props.resourceRoute)) {
      this.setState({selection: router.getCurrentParams().splat});
    } else {
      this.setState({selection: undefined});
    }
  },

  getInitialState: function () {
    var options = this.props.options;
    var queryText = this.context.router.getCurrentQuery().q;
    if (queryText) {
      options = merge(this.props.options,
        {params: {query: IndexQuery.create(queryText)}});
    }
    var state = {options: options, selection: null};
    if (this.props.manageData) {
      state.result = {};
    }
    return state;
  },

  componentWillMount: function () {
    this._setSelectionFromLocation();
  },

  componentDidMount: function () {
    if (this.props.manageData) {
      this._getData();
    }
  },

  componentWillReceiveProps: function () {
    this._setSelectionFromLocation();
  },

  render: function () {
    return (
      <Split>
        <Index
          options={this.state.options}
          result={this.state.result}
          selection={this.state.selection}
          onSelect={this._onSelect}
          onQuery={this._onQuery} />
        <RouteHandler />
      </Split>
    );
  }

});

module.exports = TourIndex;
