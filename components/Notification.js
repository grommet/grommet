'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactIntl = require('react-intl');

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Meter = require('./Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'notification';

var Notification = function Notification(props, context) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--status-' + props.status.toLowerCase(), 'background-color-index-' + props.status.toLowerCase(), props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + props.size, props.size), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !props.onClick), _classnames));

  var status = undefined;
  if (props.status) {
    status = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__status',
      value: props.status, size: props.size });
  }

  var state = undefined;
  if (props.state) {
    state = _react2.default.createElement(
      'div',
      { className: CLASS_ROOT + '__state' },
      props.state
    );
  }

  var progress = undefined;
  if (props.percentComplete || 0 === props.percentComplete) {
    progress = _react2.default.createElement(_Meter2.default, { units: '%',
      series: [{
        value: props.percentComplete,
        label: '',
        colorIndex: 'light-1'
      }],
      size: 'large' });
  }

  var timestamp = undefined;
  if (props.timestamp) {
    var timestampFormatted = props.timestamp.toString();
    if (context.intl) {
      timestampFormatted = _react2.default.createElement(_reactIntl.FormattedDate, { value: props.timestamp,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric' });
    }

    timestamp = _react2.default.createElement(
      'div',
      { className: CLASS_ROOT + '__timestamp' },
      timestampFormatted
    );
  }

  var boxProps = _Props2.default.pick(props, _Box2.default);

  return _react2.default.createElement(
    _Box2.default,
    _extends({}, boxProps, { className: classes, direction: 'row', responsive: false }),
    status,
    _react2.default.createElement(
      _Box2.default,
      null,
      _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__message' },
        props.message
      ),
      props.context,
      timestamp,
      state,
      progress,
      props.children
    )
  );
};

Notification.propTypes = _extends({
  context: _react.PropTypes.node,
  message: _react.PropTypes.string.isRequired,
  percentComplete: _react.PropTypes.number,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  state: _react.PropTypes.string,
  status: _react.PropTypes.string,
  timestamp: _react.PropTypes.object }, _Box2.default.propTypes);

Notification.contextTypes = {
  intl: _react.PropTypes.object
};

Notification.defaultProps = {
  flush: true,
  status: 'unknown',
  pad: 'medium'
};

Notification.displayName = 'Notification';

exports.default = Notification;
module.exports = exports['default'];