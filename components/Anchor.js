// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var RightIcon = require('./icons/Right');

var CLASS_ROOT = "anchor";

var Anchor = React.createClass({
  displayName: 'Anchor',

  propTypes: {
    href: React.PropTypes.string,
    tag: React.PropTypes.string,
    target: React.PropTypes.string,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return { tag: 'a' };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    var icon;
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
      icon = React.createElement(RightIcon, null);
    }
    if (!this.props.onClick) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      this.props.tag,
      { id: this.props.id, className: classes.join(' '),
        href: this.props.href,
        target: this.props.target,
        onClick: this.props.onClick },
      icon,
      this.props.children
    );
  }

});

module.exports = Anchor;