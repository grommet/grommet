// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Task = React.createClass({
  displayName: 'Task',

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  render: function render() {
    var resource = this.props.resource;
    var status = resource.status || this.getGrommetIntlMessage('Unknown');
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        React.createElement(StatusIcon, { value: status.toLowerCase(), large: true }),
        React.createElement(
          'h3',
          null,
          resource.name
        )
      ),
      React.createElement(
        'h4',
        null,
        this.getGrommetFormattedDate(resource.created)
      ),
      this.props.associatedResource
    );
  }

});

module.exports = Task;