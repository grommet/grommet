// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var Timestamp = require('react-time');

var IndexAttribute = React.createClass({

  propTypes: {
    item: React.PropTypes.object,
    attribute: React.PropTypes.shape({
      attribute: React.PropTypes.string,
      timestamp: React.PropTypes.bool
    })
  },

  render: function() {
    var item = this.props.item;
    var attribute = this.props.attribute;
    var content = (<span>'?'</span>);
    var value;

    if (attribute.hasOwnProperty('render')) {

      content = attribute.render(item);

    } else {

      if (item.hasOwnProperty(attribute.attribute)) {
        value = item[attribute.attribute];
      } else if (item.attributes &&
        item.attributes.hasOwnProperty(attribute.attribute)) {
        value = item.attributes[attribute.attribute];
      }

      if ('status' === attribute.attribute) {
        content = (
          <StatusIcon value={value.toLowerCase()} small={true} />
        );
      } else if (attribute.timestamp) {
        content = (
          <Timestamp value={new Date(value)} format="MM/DD/YY h:mm:ssa" />
        );
      } else {
        content = (<span>{value}</span>);
      }
    }

    return content;
  }

});

module.exports = IndexAttribute;
