// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var React = require('react');

var CLASS_ROOT = "icon-spinning";

var Spinning = React.createClass({
  displayName: "Spinning",

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return React.createElement(
      "svg",
      { className: classes.join(' '), viewBox: "0 0 48 48", version: "1.1" },
      React.createElement("circle", { stroke: "#ddd", strokeWidth: "4", strokeDasharray: "24px 8px", fill: "none", cx: "24", cy: "24", r: "20" }),
      React.createElement("circle", { stroke: "#333", strokeWidth: "4", strokeDasharray: "24px 104px", fill: "none", cx: "24", cy: "24", r: "20" })
    );
  }

});

module.exports = Spinning;