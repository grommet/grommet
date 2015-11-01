// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var React = require('react');

var CLASS_ROOT = "headline";

var Headline = React.createClass({
  displayName: "Headline",

  propTypes: {
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    strong: React.PropTypes.bool
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.strong) {
      classes.push(CLASS_ROOT + "--strong");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      "div",
      { className: classes.join(' ') },
      this.props.children
    );
  }

});

module.exports = Headline;