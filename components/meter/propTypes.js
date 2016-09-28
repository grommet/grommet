'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports.default = {
  activeIndex: _react.PropTypes.number,
  max: _react.PropTypes.number.isRequired,
  min: _react.PropTypes.number.isRequired,
  onActivate: _react.PropTypes.func.isRequired,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string, // used in Spiral
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    onClick: _react.PropTypes.func
  })).isRequired,
  stacked: _react.PropTypes.bool,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  total: _react.PropTypes.number.isRequired,
  vertical: _react.PropTypes.bool
}; // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];