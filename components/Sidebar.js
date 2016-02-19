'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'sidebar';

var Sidebar = function Sidebar(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--primary', props.primary), _defineProperty(_classnames, CLASS_ROOT + '--fixed', props.fixed), _defineProperty(_classnames, CLASS_ROOT + '--' + props.size, props.size), _classnames));

  var boxProps = _Props2.default.pick(props, _Box2.default);

  return _react2.default.createElement(
    _Box2.default,
    _extends({}, boxProps, { className: classes, primary: false }),
    props.children
  );
};

Sidebar.propTypes = _extends({
  fixed: _react.PropTypes.bool,
  primary: _react.PropTypes.bool, // Deprecated
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Sidebar.defaultProps = {
  direction: 'column',
  primary: false
};

Sidebar.displayName = 'Sidebar';

exports.default = Sidebar;
module.exports = exports['default'];