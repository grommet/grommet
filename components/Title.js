// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Box = require('./Box');

var Intl = require('../utils/Intl');

var CLASS_ROOT = "title";

var Title = React.createClass({
  displayName: 'Title',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    onClick: React.PropTypes.func,
    responsive: React.PropTypes.bool
  },

  contextTypes: {
    intl: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      responsive: true,
      a11yTitle: 'Title'
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

    var a11yTitle = Intl.getMessage(this.context.intl, this.props.a11yTitle);

    return React.createElement(
      Box,
      { align: 'center', direction: 'row', responsive: false,
        className: classes.join(' '), a11yTitle: a11yTitle,
        onClick: this.props.onClick },
      this.props.children
    );
  }

});

module.exports = Title;