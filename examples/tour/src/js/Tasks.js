// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Index = require('grommet/components/Index');
var Rest = require('grommet/utils/Rest');
var IndexQuery = require('grommet/utils/IndexQuery');
var SessionActions = require('grommet/actions/SessionActions');

var SCHEMA = [
  {attribute: 'status', label: 'Status', index: 0},
  {attribute: 'name', label: 'Name', index: 1},
  {attribute: 'associatedResourceName', label: 'Resource', index: 2},
  {attribute: 'created', label: 'Time', index: 3, timestamp: true},
  {attribute: 'state', label: 'State', index: 4}
];

var Tasks = React.createClass({

  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', data: {}});
    } else if (res.status === 400) {
      SessionActions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, data: {}});
    } else {
      var data = res.body;
      this.setState({data: data, error: null});
    }
  },

  _getData: function () {
    Rest.get('/rest/index/resources',
      {category: 'tasks', start: 0, count: 20, query: this.state.query.fullText},
      this._onResponse);
  },

  _onQuery: function (query) {
    this.setState({query: query}, this._getData);
  },

  getInitialState: function () {
    return {
      schema: SCHEMA,
      query: IndexQuery.create(''),
      data: {}
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  render: function () {
    return (
      <Index
        schema={this.state.schema}
        query={this.state.query}
        data={this.state.data}
        error={this.state.error}
        onQuery={this._onQuery}
        view="table" />
    );
  }

});

module.exports = Tasks;
