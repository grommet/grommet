// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Index = require('grommet/components/index/Index');
var Rest = require('grommet/utils/Rest');
var Actions = require('grommet/actions/Actions');

var OPTIONS = {
  view: 'table',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0},
    {attribute: 'name', label: 'Name', index: 1},
    {attribute: 'associatedResourceName', label: 'Resource', index: 2},
    {attribute: 'created', label: 'Time', index: 3, timestamp: true},
    {attribute: 'state', label: 'State', index: 4}
  ],
  params: {
    category: 'tasks',
    start: 0,
    count: 20,
    query: null
  }
};

var Tasks = React.createClass({

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
    Rest.get('/rest/index/resources', this.state.options.params)
      .end(this._onResponse);
  },

  _onQuery: function (query) {
    var options = merge(this.state.options, {params: {query: query}});
    this.setState({options: options}, this._getData);
  },

  getInitialState: function () {
    return {
      options: OPTIONS,
      result: {}
    };
  },

  componentWillMount: function () {
    this._getData();
  },

  render: function () {
    return (
      <Index
        options={this.state.options}
        result={this.state.result}
        onQuery={this._onQuery} />
    );
  }

});

module.exports = Tasks;
