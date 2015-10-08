// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var Section = require('../Section');
var Header = require('../Header');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Alert = React.createClass({
  displayName: 'Alert',

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  render: function render() {
    var resource = this.props.resource;
    var status = resource.status || 'unknown';
    var createdDate;
    if (resource.created) {
      createdDate = this.getGrommetFormattedDate(resource.created);
    }

    return React.createElement(
      Section,
      { className: 'alert', pad: { horizontal: "medium" } },
      React.createElement(
        Header,
        null,
        React.createElement(
          'span',
          null,
          React.createElement(StatusIcon, { value: status.toLowerCase(), large: true }),
          React.createElement(
            'h3',
            null,
            resource.name
          )
        )
      ),
      React.createElement(
        'span',
        { className: 'alert__timestamp' },
        createdDate
      ),
      this.props.associatedResource
    );
  }

});

module.exports = Alert;