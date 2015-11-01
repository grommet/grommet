// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// NOTE: This component is a temporary wrapper of react-intl FormattedMessage
// to avoid errors being thrown if the context hasn't been wrapped by
// IntlProvider. The hope is that react-intl will change to obviate the
// need for this component.

'use strict';

var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;

var GrommetFormattedMessage = React.createClass({
  displayName: 'GrommetFormattedMessage',

  propTypes: {
    id: React.PropTypes.string,
    defaultMessage: React.PropTypes.string
  },

  contextTypes: {
    intl: React.PropTypes.object
  },

  render: function render() {
    var result;
    if (this.context.intl) {
      result = React.createElement(FormattedMessage, { id: this.props.id,
        defaultMessage: this.props.defaultMessage });
    } else {
      result = React.createElement(
        'span',
        null,
        this.props.defaultMessage || this.props.id
      );
    }

    return result;
  }

});

module.exports = GrommetFormattedMessage;