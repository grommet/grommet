'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'notification';

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification() {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Notification).apply(this, arguments));
  }

  _createClass(Notification, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--status-' + this.props.status.toLowerCase(), 'background-color-index-' + this.props.status.toLowerCase(), this.props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + this.props.size, this.props.size), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !this.props.onClick), _classnames));

      var status = void 0;
      if (this.props.status) {
        status = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__status',
          value: this.props.status, size: this.props.size });
      }

      var state = void 0;
      if (this.props.state) {
        state = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__state' },
          this.props.state
        );
      }

      var progress = void 0;
      if (this.props.percentComplete || 0 === this.props.percentComplete) {
        progress = _react2.default.createElement(_Meter2.default, { units: '%',
          series: [{
            value: this.props.percentComplete,
            label: '',
            colorIndex: 'light-1'
          }] });
      }

      var timestamp = void 0;
      if (this.props.timestamp) {
        var timestampFormatted = this.props.timestamp.toString();
        if (this.context.intl) {
          timestampFormatted = _react2.default.createElement(_reactIntl.FormattedDate, { value: this.props.timestamp,
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

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));

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
            this.props.message
          ),
          this.props.context,
          timestamp,
          state,
          progress,
          this.props.children
        )
      );
    }
  }]);

  return Notification;
}(_react.Component);

exports.default = Notification;
;

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
module.exports = exports['default'];