'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactIntl = require('react-intl');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Animate = require('./Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _Meter = require('./Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _Close = require('./icons/base/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.NOTIFICATION;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Notification = function (_Component) {
  (0, _inherits3.default)(Notification, _Component);

  function Notification() {
    (0, _classCallCheck3.default)(this, Notification);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Notification).apply(this, arguments));
  }

  (0, _createClass3.default)(Notification, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--status-' + this.props.status.toLowerCase(), BACKGROUND_COLOR_INDEX + '-' + this.props.status.toLowerCase(), this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + this.props.size, this.props.size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', !this.props.onClick), _classnames));

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

      var closer = void 0;
      if ((0, _typeof3.default)(this.props.closer) === 'object') {
        closer = this.props.closer;
      } else if (this.props.onClose && this.props.closer) {
        closer = _react2.default.createElement(
          _Box2.default,
          { direction: 'row', align: 'start', responsive: false, flex: false },
          _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__close-button',
            plain: true, onClick: this.props.onClose,
            icon: _react2.default.createElement(_Close2.default, { className: CLASS_ROOT + '__close' }),
            a11yTitle: _Intl2.default.getMessage(this.context.intl, 'Close Notification') })
        );
      }

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var fullBox = boxProps.hasOwnProperty('full') ? boxProps.full : 'horizontal';

      return _react2.default.createElement(
        _Animate2.default,
        {
          enter: { animation: 'fade', duration: 1000 },
          leave: { animation: 'fade', duration: 1000 } },
        _react2.default.createElement(
          _Box2.default,
          (0, _extends3.default)({}, boxProps, { className: classes,
            direction: 'row', responsive: false }),
          status,
          _react2.default.createElement(
            _Box2.default,
            { full: fullBox },
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
          ),
          closer
        )
      );
    }
  }]);
  return Notification;
}(_react.Component);

Notification.displayName = 'Notification';
exports.default = Notification;
;

Notification.propTypes = (0, _extends3.default)({
  closer: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.bool]),
  context: _react.PropTypes.node,
  message: _react.PropTypes.string.isRequired,
  onClose: _react.PropTypes.func,
  percentComplete: _react.PropTypes.number,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  state: _react.PropTypes.string,
  status: _react.PropTypes.string,
  timestamp: _react.PropTypes.object }, _Box2.default.propTypes);

Notification.contextTypes = {
  intl: _react.PropTypes.object
};

Notification.defaultProps = {
  closer: false,
  flush: true,
  status: 'unknown',
  pad: 'medium'
};
module.exports = exports['default'];