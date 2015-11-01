// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var CLASS_ROOT = "attribute";

var Attribute = React.createClass({
  displayName: 'Attribute',

  propTypes: {
    label: React.PropTypes.string
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    return React.createElement(
      'div',
      { className: classes.join(' ') },
      React.createElement(
        'label',
        { className: CLASS_ROOT + "__label" },
        this.props.label
      ),
      React.createElement(
        'span',
        { className: CLASS_ROOT + "__contents" },
        this.props.children
      )
    );
  }

});

module.exports = Attribute;