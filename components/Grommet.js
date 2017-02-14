'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "grommet";

exports.default = function (props) {
  var children = props.children,
      className = props.className,
      restProps = _objectWithoutProperties(props, ['children', 'className']);

  var classes = (0, _classnames2.default)(CLASS_ROOT, className);

  return _react2.default.createElement(
    'div',
    _extends({}, restProps, { className: classes }),
    children
  );
};

module.exports = exports['default'];