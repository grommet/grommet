// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var React = require('react');

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "dashboard" },
      this.props.children
    );
  }

});

module.exports = Dashboard;