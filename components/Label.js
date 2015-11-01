// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var React = require('react');

var Label = React.createClass({
  displayName: "Label",

  propTypes: {
    icon: React.PropTypes.node,
    text: React.PropTypes.string
  },

  render: function render() {
    var icon = null;
    var text = null;
    if (this.props.icon) {
      icon = React.createElement(
        "span",
        { className: "label__icon control-icon" },
        this.props.icon
      );
    }
    if (this.props.text) {
      text = React.createElement(
        "span",
        { className: "label__text" },
        this.props.text
      );
    }
    return React.createElement(
      "div",
      { className: "label" },
      icon,
      text
    );
  }

});

module.exports = Label;