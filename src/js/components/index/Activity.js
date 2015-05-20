// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Index = require('./Index');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Activity = React.createClass({

  mixins: [IntlMixin],

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
        {attribute: 'status', label: this.getIntlMessage('Activity.status'), index: 0, size: 'small', header: true,
          filter: [
            this.getIntlMessage('Activity.filter.error'),
            this.getIntlMessage('Activity.filter.warning'),
            this.getIntlMessage('Activity.filter.ok'),
            this.getIntlMessage('Activity.filter.unknown')
          ]},
        {attribute: 'name', label: this.getIntlMessage('Activity.name'), index: 1},
        {attribute: 'associatedResourceName', label: this.getIntlMessage('Activity.resource'), index: 2, size: 'medium'},
        {attribute: 'created', label: this.getIntlMessage('Activity.time'), index: 3,
          timestamp: true, size: 'medium', secondary: true, fitler: true},
        {attribute: 'state', label: this.getIntlMessage('Activity.state'), index: 4, size: 'medium', secondary: true,
          filter: [
            this.getIntlMessage('Activity.filter.active'),
            this.getIntlMessage('Activity.filter.cleared'),
            this.getIntlMessage('Activity.filter.running'),
            this.getIntlMessage('Activity.filter.completed')
          ]},
        {attribute: 'category', label: this.getIntlMessage('Activity.category'),
          filter: [this.getIntlMessage('Activity.filter.alerts'), this.getIntlMessage('Activity.filter.tasks')]},
      ],
      params: {
        category: ['alerts', 'tasks'],
        sort: 'created:desc',
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
