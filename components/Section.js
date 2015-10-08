// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Box = require('./Box');
var SkipLinkAnchor = require('./SkipLinkAnchor');
var merge = require('lodash/object/merge');

var CLASS_ROOT = "section";

var Section = React.createClass({
  displayName: 'Section',

  propTypes: merge(Box.propTypes, {
    primary: React.PropTypes.bool
  }),

  getDefaultProps: function getDefaultProps() {
    return { pad: { vertical: 'medium' } };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var skipLinkAnchor = null;
    if (this.props.primary) {
      skipLinkAnchor = React.createElement(SkipLinkAnchor, { label: 'Main Content' });
    }

    return React.createElement(
      Box,
      _extends({ tag: 'section' }, this.props, { className: classes.join(' ') }),
      skipLinkAnchor,
      this.props.children
    );
  }

});

module.exports = Section;