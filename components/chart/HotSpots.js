'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_HOT_SPOTS;

// Interactive regions.

var HotSpots = function (_Component) {
  (0, _inherits3.default)(HotSpots, _Component);

  function HotSpots() {
    (0, _classCallCheck3.default)(this, HotSpots);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HotSpots.__proto__ || (0, _getPrototypeOf2.default)(HotSpots)).call(this));

    _this._onPreviousHotSpot = _this._onPreviousHotSpot.bind(_this);
    _this._onNextHotSpot = _this._onNextHotSpot.bind(_this);
    _this._onHotSpotFocus = _this._onHotSpotFocus.bind(_this);
    _this._onHotSpotBlur = _this._onHotSpotBlur.bind(_this);
    _this._onHotSpotClick = _this._onHotSpotClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HotSpots, [{
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
          props = (0, _objectWithoutProperties3.default)(_props4, ['a11yTitle', 'activeIndex', 'className', 'count', 'onActive', 'onClick', 'vertical']);

      delete props.height;
      delete props.width;

      var intl = this.context.intl;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--clickable', onClick), _classnames), className);

      var defaultBasis = 100 / (count - 1);
      var items = [];

      var _loop = function _loop(index) {
        var bandClasses = (0, _classnames4.default)(CLASS_ROOT + '__band', (0, _defineProperty3.default)({}, CLASS_ROOT + '__band--active', index === activeIndex));
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
        (0, _extends3.default)({}, props, { className: classes, style: { padding: _utils.padding },
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
;

HotSpots.contextTypes = {
  intl: _react.PropTypes.object
};

HotSpots.propTypes = {
  a11yTitle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  activeIndex: _react.PropTypes.number,
  count: _react.PropTypes.number.isRequired,
  onActive: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  vertical: _react.PropTypes.bool
};
module.exports = exports['default'];