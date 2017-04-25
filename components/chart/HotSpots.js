'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _utils = require('./utils');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_HOT_SPOTS;

// Interactive regions.

var HotSpots = function (_Component) {
  _inherits(HotSpots, _Component);

  function HotSpots() {
    _classCallCheck(this, HotSpots);

    var _this = _possibleConstructorReturn(this, (HotSpots.__proto__ || Object.getPrototypeOf(HotSpots)).call(this));

    _this._onPreviousHotSpot = _this._onPreviousHotSpot.bind(_this);
    _this._onNextHotSpot = _this._onNextHotSpot.bind(_this);
    _this._onHotSpotFocus = _this._onHotSpotFocus.bind(_this);
    _this._onHotSpotBlur = _this._onHotSpotBlur.bind(_this);
    _this._onHotSpotClick = _this._onHotSpotClick.bind(_this);
    return _this;
  }

  _createClass(HotSpots, [{
    key: '_onHotSpotFocus',
    value: function _onHotSpotFocus() {
      this._keyboardHandlers = {
        left: this._onPreviousHotSpot,
        up: this._onPreviousHotSpot,
        right: this._onNextHotSpot,
        down: this._onNextHotSpot,
        enter: this._onHotSpotClick
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onHotSpotBlur',
    value: function _onHotSpotBlur() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onPreviousHotSpot',
    value: function _onPreviousHotSpot(event) {
      event.preventDefault();
      var _props = this.props,
          activeIndex = _props.activeIndex,
          onActive = _props.onActive;

      var previousIndex = activeIndex - 1;
      if (previousIndex >= 0) {
        onActive(previousIndex);
      }
      //stop event propagation
      return true;
    }
  }, {
    key: '_onNextHotSpot',
    value: function _onNextHotSpot(event) {
      event.preventDefault();
      var _props2 = this.props,
          activeIndex = _props2.activeIndex,
          count = _props2.count,
          onActive = _props2.onActive;

      var nextIndex = activeIndex + 1;
      if (nextIndex < count) {
        onActive(nextIndex);
      }
      //stop event propagation
      return true;
    }
  }, {
    key: '_onHotSpotClick',
    value: function _onHotSpotClick() {
      var _props3 = this.props,
          activeIndex = _props3.activeIndex,
          onClick = _props3.onClick;


      if (activeIndex !== undefined && onClick) {
        onClick(activeIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props4 = this.props,
          a11yTitle = _props4.a11yTitle,
          activeIndex = _props4.activeIndex,
          className = _props4.className,
          count = _props4.count,
          onActive = _props4.onActive,
          onClick = _props4.onClick,
          vertical = _props4.vertical,
          props = _objectWithoutProperties(_props4, ['a11yTitle', 'activeIndex', 'className', 'count', 'onActive', 'onClick', 'vertical']);

      delete props.height;
      delete props.width;

      var intl = this.context.intl;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--clickable', onClick), _classnames), className);

      var defaultBasis = 100 / (count - 1);
      var items = [];

      var _loop = function _loop(index) {
        var bandClasses = (0, _classnames4.default)(CLASS_ROOT + '__band', _defineProperty({}, CLASS_ROOT + '__band--active', index === activeIndex));
        var basis = void 0;
        if (0 === index || index === count - 1) {
          basis = defaultBasis / 2;
        } else {
          basis = defaultBasis;
        }
        var style = { flexBasis: basis + '%' };
        items.push(_react2.default.createElement('div', { key: index, className: bandClasses, style: style,
          role: onClick ? 'button' : 'row',
          'aria-label': a11yTitle,
          onMouseOver: onActive ? function () {
            return onActive(index);
          } : undefined,
          onMouseOut: onActive ? function () {
            return onActive(undefined);
          } : undefined,
          onClick: onClick ? function () {
            return onClick(index);
          } : undefined }));
      };

      for (var index = 0; index < count; index += 1) {
        _loop(index);
      }

      var hotSpotsLabel = _Intl2.default.getMessage(intl, 'HotSpotsLabel');

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: classes, style: { padding: _utils.padding },
          tabIndex: '0', onFocus: this._onHotSpotFocus,
          onBlur: this._onHotSpotBlur, role: 'group',
          'aria-label': hotSpotsLabel }),
        items
      );
    }
  }]);

  return HotSpots;
}(_react.Component);

HotSpots.displayName = 'HotSpots';
exports.default = HotSpots;


HotSpots.contextTypes = {
  intl: _propTypes2.default.object
};

HotSpots.propTypes = {
  a11yTitle: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  activeIndex: _propTypes2.default.number,
  count: _propTypes2.default.number.isRequired,
  onActive: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  vertical: _propTypes2.default.bool
};
module.exports = exports['default'];