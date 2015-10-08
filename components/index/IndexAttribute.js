// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "index-attribute";

var IndexAttribute = React.createClass({
  displayName: 'IndexAttribute',

  mixins: [IntlMixin],

  propTypes: {
    item: React.PropTypes.object.isRequired,
    attribute: React.PropTypes.shape({
      attribute: React.PropTypes.string,
      timestamp: React.PropTypes.bool
    }).isRequired,
    className: React.PropTypes.string
  },

  render: function render() {
    var attribute = this.props.attribute;

    var classes = [CLASS_ROOT];
    if (attribute.secondary) {
      classes.push(CLASS_ROOT + "--secondary");
    }
    if (attribute.size) {
      classes.push(CLASS_ROOT + "--" + attribute.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var item = this.props.item;
    var content = React.createElement(
      'span',
      null,
      '\'?\''
    );
    var value;

    if (attribute.hasOwnProperty('render')) {

      content = attribute.render(item);
    } else {

      if (item.hasOwnProperty(attribute.attribute)) {
        value = item[attribute.attribute];
      } else if (item.attributes && item.attributes.hasOwnProperty(attribute.attribute)) {
        value = item.attributes[attribute.attribute];
      }

      if ('status' === attribute.attribute) {
        content = React.createElement(StatusIcon, { className: classes.join(' '),
          value: value.toLowerCase(), small: true });
      } else if (attribute.timestamp) {
        content = React.createElement(
          'span',
          { className: classes.join(' ') },
          this.getGrommetFormattedDate(value)
        );
      } else {
        content = React.createElement(
          'span',
          { className: classes.join(' ') },
          this.getGrommetIntlMessage(value)
        );
      }
    }

    return content;
  }

});

module.exports = IndexAttribute;