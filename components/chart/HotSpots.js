'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _utils = require('./utils');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_HOT_SPOTS; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CHART = _CSSClassnames2.default.CHART;

// Interactive regions.

var HotSpots = function (_Component) {
  (0, _inherits3.default)(HotSpots, _Component);

  function HotSpots() {
    (0, _classCallCheck3.default)(this, HotSpots);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HotSpots).call(this));

    _this._onPreviousHotSpot = _this._onPreviousHotSpot.bind(_this);
    _this._onNextHotSpot = _this._onNextHotSpot.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HotSpots, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._keyboardHandlers = {
        left: this._onPreviousHotSpot,
        up: this._onPreviousHotSpot,
        right: this._onNextHotSpot,
        down: this._onNextHotSpot
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onPreviousHotSpot',
    value: function _onPreviousHotSpot() {
      if (document.activeElement.className.indexOf(CHART) !== -1) {
        var _props = this.props;
        var activeIndex = _props.activeIndex;
        var onActive = _props.onActive;

        var previousIndex = activeIndex - 1;
        if (previousIndex >= 0) {
          onActive(previousIndex);
          //stop event propagation
          return true;
        }
      }
    }
  }, {
    key: '_onNextHotSpot',
    value: function _onNextHotSpot() {
      if (document.activeElement.className.indexOf(CHART) !== -1) {
        var _props2 = this.props;
        var activeIndex = _props2.activeIndex;
        var count = _props2.count;
        var onActive = _props2.onActive;

        var nextIndex = activeIndex + 1;
        if (nextIndex < count) {
          onActive(nextIndex);
          //stop event propagation
          return true;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props3 = this.props;
      var activeIndex = _props3.activeIndex;
      var className = _props3.className;
      var count = _props3.count;
      var onActive = _props3.onActive;
      var onClick = _props3.onClick;
      var vertical = _props3.vertical;


      var classes = (0, _classnames4.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--clickable', onClick), _classnames));

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

      return _react2.default.createElement(
        'div',
        { ref: 'hotSpots', className: classes, style: { padding: _utils.padding },
          'aria-hidden': 'true' },
        items
      );
    }
  }]);
  return HotSpots;
}(_react.Component);

HotSpots.displayName = 'HotSpots';
exports.default = HotSpots;
;

HotSpots.propTypes = {
  activeIndex: _react.PropTypes.number,
  count: _react.PropTypes.number.isRequired,
  onActive: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  vertical: _react.PropTypes.bool
};
module.exports = exports['default'];