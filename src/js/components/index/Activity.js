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
    label: React.PropTypes.string,
    onQuery: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    navControl: React.PropTypes.node,
    query: React.PropTypes.object,
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ])
  },

  getInitialState: function () {
    var options = DEFAULT_OPTIONS;
    if (this.props.query) {
      options = merge(options, {params: {query: this.props.query}});
    }
    if (this.props.label) {
      options = merge(options, {label: this.props.label});
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
        selection={this.props.selection}
        onQuery={this.props.onQuery}
        onSelect={this.props.onSelect}
        navControl={this.props.navControl} />
    );
  }

});

module.exports = Activity;
