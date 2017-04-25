'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports.baseDimension = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.buildPath = buildPath;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Graphics = require('../../utils/Graphics');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER;

var baseDimension = exports.baseDimension = _Graphics.baseUnit * 8;

var propTypes = exports.propTypes = {
  activeIndex: _propTypes2.default.number,
  a11yTitle: _propTypes2.default.string,
  max: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.number.isRequired,
  onActivate: _propTypes2.default.func,
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    value: _propTypes2.default.number.isRequired,
    colorIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func
  })).isRequired,
  total: _propTypes2.default.number
};

function buildPath(itemIndex, commands, classes, onActivate, onClick, a11yTitle, role) {
  if (onActivate) {
    var onOver = onActivate.bind(null, itemIndex);
    var onOut = onActivate.bind(null, undefined);

    var a11yRoles = {};
    if (a11yTitle) {
      a11yRoles['aria-label'] = a11yTitle;
      a11yRoles.role = role;
    }

    return _react2.default.createElement(
      'g',
      _extends({ key: itemIndex }, a11yRoles),
      _react2.default.createElement('path', { className: classes, d: commands,
        'data-index': itemIndex, onFocus: onOver, onBlur: onOut }),
      _react2.default.createElement('path', { className: CLASS_ROOT + '__hot', d: commands, fill: 'none',
        onMouseOver: onOver, onMouseOut: onOut,
        onClick: onClick })
    );
  } else {
    return _react2.default.createElement('path', { key: itemIndex, className: classes, d: commands });
  }
}