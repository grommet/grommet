'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports.default = {
  activeIndex: _react.PropTypes.number,
  a11yDesc: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  legend: _react.PropTypes.shape({
    position: _react.PropTypes.oneOf(['right', 'bottom', 'inline'])
  }),
  max: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string
  }).isRequired,
  min: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string
  }).isRequired,
  onActivate: _react.PropTypes.func.isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    important: _react.PropTypes.bool,
    onClick: _react.PropTypes.func
  })).isRequired,
  stacked: _react.PropTypes.bool,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  total: _react.PropTypes.number.isRequired,
  units: _react.PropTypes.string,
  vertical: _react.PropTypes.bool
}; // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];