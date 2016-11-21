'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "grommet";

exports.default = function (props) {
  var children = props.children,
      className = props.className,
      restProps = (0, _objectWithoutProperties3.default)(props, ['children', 'className']);

  var classes = (0, _classnames2.default)(CLASS_ROOT, className);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, restProps, { className: classes }),
    children
  );
};

module.exports = exports['default'];