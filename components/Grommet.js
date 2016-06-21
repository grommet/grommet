"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = "grommet"; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

exports.default = function (props) {

  return _react2.default.createElement(
    "div",
    { className: CLASS_ROOT },
    props.children
  );
};

module.exports = exports["default"];