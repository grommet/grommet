// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "index-attribute";

var IndexAttribute = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    item: React.PropTypes.object.isRequired,
    attribute: React.PropTypes.shape({
      attribute: React.PropTypes.string,
      timestamp: React.PropTypes.bool
    }).isRequired,
    className: React.PropTypes.string
  },

  render: function() {
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
          <StatusIcon className={classes.join(' ')}
            value={value.toLowerCase()} small={true} />
        );
      } else if (attribute.timestamp) {
        content = (
          <span className={classes.join(' ')}>
            {this.getGrommetFormattedDate(value)}
          </span>
        );
      } else {
        content = (
          <span className={classes.join(' ')}>{this.getGrommetIntlMessage(value)}</span>
        );
      }
    }

    return content;
  }

});

module.exports = IndexAttribute;
