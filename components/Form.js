// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var keys = require('lodash/object/keys');

var CLASS_ROOT = "form";

var Form = React.createClass({
  displayName: 'Form',

  propTypes: {
    compact: React.PropTypes.bool,
    fill: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    pad: React.PropTypes.oneOfType([React.PropTypes.oneOf(['none', 'small', 'medium', 'large']), React.PropTypes.shape({
      horizontal: React.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: React.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      compact: false,
      fill: false,
      flush: true,
      pad: 'none'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.compact) {
      classes.push(CLASS_ROOT + "--compact");
    }
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.pad) {
      if (typeof this.props.pad === 'string') {
        classes.push(CLASS_ROOT + "--pad-" + this.props.pad);
      } else if (typeof this.props.pad === 'object') {
        keys(this.props.pad).forEach(function (key) {
          classes.push(CLASS_ROOT + '--pad-' + key + '-' + this.props.pad[key]);
        });
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return React.createElement(
      'form',
      { className: classes.join(' '), onSubmit: this.props.onSubmit },
      this.props.children
    );
  }

});

module.exports = Form;