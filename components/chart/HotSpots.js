'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _utils = require('./utils');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_HOT_SPOTS;

// Interactive regions.

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var HotSpots = function (_Component) {
  (0, _inherits3.default)(HotSpots, _Component);

  function HotSpots() {
    (0, _classCallCheck3.default)(this, HotSpots);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HotSpots).apply(this, arguments));
  }

  (0, _createClass3.default)(HotSpots, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var count = _props.count;
      var vertical = _props.vertical;
      var activeIndex = _props.activeIndex;
      var onActive = _props.onActive;
      var onClick = _props.onClick;


      var classes = [CLASS_ROOT];
      if (vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (onClick) {
        classes.push(CLASS_ROOT + '--clickable');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var defaultBasis = 100 / (count - 1);
      var items = [];

      var _loop = function _loop(index) {
        var classes = [CLASS_ROOT + '__band'];
        if (index === activeIndex) {
          classes.push(CLASS_ROOT + '__band--active');
        }
        var basis = void 0;
        if (0 === index || index === count - 1) {
          basis = defaultBasis / 2;
        } else {
          basis = defaultBasis;
        }
        var style = { flexBasis: basis + '%' };
        items.push(_react2.default.createElement('div', { key: index, className: classes.join(' '), style: style,
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
        { ref: 'hotSpots', className: classes.join(' '),
          style: { padding: _utils.padding } },
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