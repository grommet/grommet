'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactIntl = require('react-intl');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

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

var _Announcer = require('../utils/Announcer');

var _Announcer2 = _interopRequireDefault(_Announcer);

var _DOM = require('../utils/DOM');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

// import Animate from './Animate';


var CLASS_ROOT = _CSSClassnames2.default.NOTIFICATION;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification() {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this));

    _this._announce = _this._announce.bind(_this);
    _this._setDarkBackground = _this._setDarkBackground.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._announce();
      // Measure the actual background color brightness to determine whether
      // to set a dark or light context.
      this._setDarkBackground();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.status !== this.props.status) {
        this.setState({ updateDarkBackground: true });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._announce();
      if (this.state.updateDarkBackground) {
        this.setState({ updateDarkBackground: false });
        this._setDarkBackground();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
    }
  }, {
    key: '_setDarkBackground',
    value: function _setDarkBackground() {
      var _this2 = this;

      var status = this.props.status;

      var container = (0, _reactDom.findDOMNode)(this._containerRef);
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
      this._checkBackground = (0, _DOM.checkDarkBackground)(status, container, function (darkBackground) {
        return _this2.setState({ darkBackground: darkBackground });
      });
    }
  }, {
    key: '_announce',
    value: function _announce() {
      var _props = this.props,
          announce = _props.announce,
          message = _props.message;
      var intl = this.context.intl;

      if (announce) {
        var notificationMessage = _Intl2.default.getMessage(intl, 'Notification');
        _Announcer2.default.announce(notificationMessage + ': ' + message);
      }
    }
  }, {
    key: '_backgroundContextClass',
    value: function _backgroundContextClass(darkBackground) {
      var result = void 0;
      if (undefined === darkBackground) {
        result = BACKGROUND_COLOR_INDEX + '--pending';
      } else if (darkBackground) {
        result = BACKGROUND_COLOR_INDEX + '--dark';
      } else {
        result = BACKGROUND_COLOR_INDEX + '--light';
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          closer = _props2.closer,
          context = _props2.context,
          percentComplete = _props2.percentComplete,
          message = _props2.message,
          onClose = _props2.onClose,
          timestamp = _props2.timestamp,
          size = _props2.size,
          state = _props2.state,
          status = _props2.status;
      var intl = this.context.intl;
      var darkBackground = this.state.darkBackground;

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--status-' + status.toLowerCase(), BACKGROUND_COLOR_INDEX + '-' + status.toLowerCase(), this._backgroundContextClass(darkBackground), _defineProperty({}, CLASS_ROOT + '--' + size, size), className);

      var statusNode = void 0;
      if (status) {
        statusNode = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__status',
          value: status, size: size });
      }

      var stateNode = void 0;
      if (state) {
        stateNode = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__state' },
          state
        );
      }

      var progress = void 0;
      if (percentComplete || 0 === percentComplete) {
        progress = _react2.default.createElement(
          _Box2.default,
          { direction: 'row', align: 'center', pad: { between: 'medium' } },
          _react2.default.createElement(_Meter2.default, {
            series: [{
              value: percentComplete,
              colorIndex: 'light-1'
            }] }),
          _react2.default.createElement(_Value2.default, { value: percentComplete, units: '%', size: 'small' })
        );
      }

      var timestampNode = void 0;
      if (timestamp) {
        var timestampFormatted = timestamp.toString();
        if (intl) {
          timestampFormatted = _react2.default.createElement(_reactIntl.FormattedDate, { value: timestamp, weekday: 'long', day: 'numeric',
            month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric',
            second: 'numeric' });
        }

        timestampNode = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__timestamp' },
          timestampFormatted
        );
      }

      var closerNode = void 0;
      if ((typeof closer === 'undefined' ? 'undefined' : _typeof(closer)) === 'object') {
        closerNode = closer;
      } else if (onClose && closer) {
        closerNode = _react2.default.createElement(_Button2.default, { plain: true, onClick: onClose,
          icon: _react2.default.createElement(_Close2.default, {
            className: CLASS_ROOT + '__close' }),
          a11yTitle: _Intl2.default.getMessage(intl, 'Close Notification') });
      }

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      var restProps = _Props2.default.omit(this.props, Object.keys(Notification.propTypes));
      boxProps.announce = false;
      var fullBox = boxProps.hasOwnProperty('full') ? boxProps.full : undefined;

      if (size && typeof size === 'string') {
        // don't transfer size to Box since it means something different
        delete boxProps.size;
      }
      /*
      <Animate enter={{ animation: 'fade', duration: 1000 }}
        leave={{ animation: 'fade', duration: 1000 }}>
      </Animate>
      */
      return _react2.default.createElement(
        _Box2.default,
        _extends({ ref: function ref(_ref) {
            return _this3._containerRef = _ref;
          }
        }, restProps, boxProps, { className: classes,
          pad: 'small', direction: 'row', align: 'start', responsive: false,
          full: fullBox }),
        _react2.default.createElement(
          _Box2.default,
          { pad: 'small' },
          statusNode
        ),
        _react2.default.createElement(
          _Box2.default,
          { flex: true, pad: 'small' },
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__message' },
            message
          ),
          context,
          timestampNode,
          stateNode,
          progress,
          children
        ),
        closerNode
      );
    }
  }]);

  return Notification;
}(_react.Component);

Notification.displayName = 'Notification';
exports.default = Notification;


Notification.propTypes = _extends({
  closer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.bool]),
  context: _propTypes2.default.node,
  message: _propTypes2.default.string.isRequired,
  onClose: _propTypes2.default.func,
  percentComplete: _propTypes2.default.number,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  state: _propTypes2.default.string,
  status: _propTypes2.default.string,
  timestamp: _propTypes2.default.object }, _Box2.default.propTypes);

Notification.contextTypes = {
  intl: _propTypes2.default.object
};

Notification.defaultProps = {
  closer: false,
  status: 'unknown',
  pad: 'medium'
};
module.exports = exports['default'];