// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Box = require('./Box');

var CLASS_ROOT = "title";

var Title = React.createClass({
  displayName: 'Title',

  propTypes: {
    onClick: React.PropTypes.func,
    responsive: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      responsive: true
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.responsive) {
      classes.push(CLASS_ROOT + "--responsive");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--interactive");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      Box,
      { align: 'center', direction: 'row', responsive: false,
        className: classes.join(' '), onClick: this.props.onClick },
      this.props.children
    );
  }

});

module.exports = Title;