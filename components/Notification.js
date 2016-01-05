'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _merge = require('lodash/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "notification";

var Notification = (function (_Component) {
  _inherits(Notification, _Component);

  function Notification() {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Notification).apply(this, arguments));
  }

  _createClass(Notification, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      classes.push(CLASS_ROOT + "--" + this.props.status.toLowerCase());
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var status;
      if (this.props.status) {
        status = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + "__status",
          value: this.props.status, small: true });
      }

      var state;
      if (this.props.state) {
        state = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__state" },
          this.props.state
        );
      }

      var timestamp;
      if (this.props.timestamp) {
        var timestampFormatted = _react2.default.createElement(_reactIntl.FormattedDate, { value: this.props.timestamp,
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric' });

        timestamp = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__timestamp" },
          timestampFormatted
        );
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({ className: classes.join(' ') }, other),
        _react2.default.createElement(
          _Box2.default,
          { direction: 'row', responsive: false },
          status,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__message" },
            this.props.message
          )
        ),
        timestamp,
        state,
        this.props.children
      );
    }
  }]);

  return Notification;
})(_react.Component);

exports.default = Notification;

Notification.defaultProps = {
  flush: true,
  status: 'unknown',
  pad: 'medium'
};

Notification.propTypes = (0, _merge2.default)({
  message: _react.PropTypes.string.isRequired,
  state: _react.PropTypes.string,
  status: _react.PropTypes.string,
  timestamp: _react.PropTypes.object // Date
}, _Box2.default.propTypes);