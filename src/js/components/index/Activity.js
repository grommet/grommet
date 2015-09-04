// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Index = require('./Index');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

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

  mixins: [IntlMixin],

  getInitialState: function () {
    var options;
    if (this.props.query) {
      options = {params: {query: this.props.query}};
    }
    if (this.props.label) {
      options = {label: this.props.label};
    }
    return {options: options};
  },

  componentWillReceiveProps: function (newProps) {
    var options = merge(this.state.options, {params: {query: newProps.query}});
    this.setState({options: options});
  },

  render: function () {
    var defaultOpt = {
      view: 'table',
      attributes: [
        {attribute: 'associatedResourceName', label: 'Resource', index: 0, size: 'medium'},
        {attribute: 'status', label: 'Status', index: 1, size: 'small', header: true,
          filter: [
            'Error', 'Warning', 'OK', 'Unknown'
          ]},
        {attribute: 'name', label: 'Name', index: 2},
        {attribute: 'created', label: 'Time', index: 3,
          timestamp: true, size: 'medium', secondary: true, fitler: true},
        {attribute: 'state', label: 'State', index: 4, size: 'medium', secondary: true,
          filter: [
            'Active', 'Cleared', 'Running', 'Completed'
          ]},
        {attribute: 'category', label: 'Category',
          filter: ['Alerts', 'Tasks']}
      ],
      params: {
        category: ['alerts', 'tasks'],
        sort: 'created:desc'
      }
    };

    var options = merge(defaultOpt, this.state.options);
    return (
      <Index
        options={options}
        selection={this.props.selection}
        onQuery={this.props.onQuery}
        onSelect={this.props.onSelect}
        navControl={this.props.navControl} />
    );
  }

});

module.exports = Activity;
