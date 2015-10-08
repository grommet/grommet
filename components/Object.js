// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "object";

var GrommetObject = React.createClass({
  displayName: 'GrommetObject',

  propTypes: {
    data: React.PropTypes.object
  },

  mixins: [IntlMixin],

  _renderArray: function _renderArray(array) {
    return array.map(function (item, index) {
      var itemContent = item;
      if ('object' === typeof item) {
        itemContent = this._renderObject(item);
      }
      return React.createElement(
        'li',
        { key: 'i_' + index, className: 'list-item' },
        itemContent
      );
    }, this);
  },

  _renderObject: function _renderObject(obj) {
    var attrs = [];
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        var value = obj[name];
        var classes = [CLASS_ROOT + "__attribute"];
        if (null === value) {
          value = 'null';
          classes.push(CLASS_ROOT + "__attribute--unset");
        } else if (Array.isArray(value)) {
          var items = this._renderArray(value);
          value = React.createElement(
            'ol',
            null,
            items
          );
          classes.push(CLASS_ROOT + "__attribute--array");
        } else if ('object' === typeof value) {
          value = this._renderObject(value);
          classes.push(CLASS_ROOT + "__attribute--container");
        } else {
          value = value.toString();
        }
        attrs.push(React.createElement(
          'li',
          { key: 'n_' + name, className: classes.join(' ') },
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__attribute-name" },
            this.getGrommetIntlMessage(name)
          ),
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__attribute-value" },
            this.getGrommetIntlMessage(value)
          )
        ));
      }
    }

    return React.createElement(
      'ul',
      null,
      attrs
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: CLASS_ROOT },
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__container" },
        this._renderObject(this.props.data)
      )
    );
  }

});

module.exports = GrommetObject;