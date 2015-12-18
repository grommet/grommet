// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var React = require('react');

var Settings = React.createClass({
  displayName: "Settings",

  componentDidMount: function componentDidMount() {
    console.warn("Settings is deprecated and will be removed soon." + "Please use Tiles instead.");
  },

  render: function render() {
    var panels = ['TBD 1', 'TBD 2'].map(function (tbd) {
      return React.createElement(
        "li",
        { key: tbd, className: "settings__panel list-item box" },
        tbd
      );
    });

    return React.createElement(
      "div",
      { className: "settings" },
      React.createElement(
        "ol",
        { className: "settings__panels list-inline" },
        panels
      )
    );
  }

});

module.exports = Settings;