// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Index = require('./Index');

var DEFAULT_OPTIONS = {
  view: 'table',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0, size: 'small', header: true,
      filter: ['Error', 'Warning', 'OK', 'Unknown']},
    {attribute: 'name', label: 'Name', index: 1},
    {attribute: 'associatedResourceName', label: 'Resource', index: 2, size: 'medium'},
    {attribute: 'created', label: 'Time', index: 3,
      timestamp: true, size: 'medium', secondary: true, fitler: true},
    {attribute: 'state', label: 'State', index: 4, size: 'medium', secondary: true,
      filter: ['Active', 'Cleared', 'Running', 'Completed']},
    {attribute: 'category', label: 'Category',
      filter: ['Alerts', 'Tasks']},
  ],
  params: {
    category: ['alerts', 'tasks'],
    sort: 'created:desc',
  }
};

var Activity = React.createClass({

  propTypes: {
    query: React.PropTypes.object,
    onQuery: React.PropTypes.func,
    onSelect: React.PropTypes.func
  },

  getInitialState: function () {
    var options = DEFAULT_OPTIONS;
    if (this.props.query) {
      options = merge(DEFAULT_OPTIONS, {params: {query: this.props.query}});
    }
    return {options: options};
  },

  componentWillReceiveProps: function (newProps) {
    var options = merge(this.state.options, {params: {query: newProps.query}});
    this.setState({options: options});
  },

  render: function () {
    return (
      <Index
        options={this.state.options}
        onQuery={this.props.onQuery}
        onSelect={this.props.onSelect} />
    );
  }

});

module.exports = Activity;
