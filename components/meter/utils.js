'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports.baseDimension = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.buildPath = buildPath;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Graphics = require('../../utils/Graphics');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var baseDimension = exports.baseDimension = _Graphics.baseUnit * 8;

var propTypes = exports.propTypes = {
  activeIndex: _react.PropTypes.number,
  a11yTitle: _react.PropTypes.string,
  max: _react.PropTypes.number.isRequired,
  min: _react.PropTypes.number.isRequired,
  onActivate: _react.PropTypes.func,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    onClick: _react.PropTypes.func
  })).isRequired,
  total: _react.PropTypes.number
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
      (0, _extends3.default)({ key: itemIndex }, a11yRoles),
      _react2.default.createElement('path', { className: classes, d: commands,
        'data-index': itemIndex, onFocus: onOver, onBlur: onOut }),
      _react2.default.createElement('path', { className: CLASS_ROOT + '__hot', d: commands, fill: 'none',
        onMouseOver: onOver, onMouseOut: onOut,
        onClick: onClick })
    );
  } else {
    return _react2.default.createElement('path', { key: itemIndex, className: classes, d: commands });
  }
};