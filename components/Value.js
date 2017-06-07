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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VALUE;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Value = function (_Component) {
  _inherits(Value, _Component);

  function Value() {
    _classCallCheck(this, Value);

    return _possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).apply(this, arguments));
  }

  _createClass(Value, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.announce) {
        (0, _Announcer.announce)(this.valueRef.textContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          active = _props.active,
          align = _props.align,
          className = _props.className,
          colorIndex = _props.colorIndex,
          icon = _props.icon,
          label = _props.label,
          responsive = _props.responsive,
          size = _props.size,
          trendIcon = _props.trendIcon,
          units = _props.units,
          value = _props.value,
          reverse = _props.reverse,
          props = _objectWithoutProperties(_props, ['active', 'align', 'className', 'colorIndex', 'icon', 'label', 'responsive', 'size', 'trendIcon', 'units', 'value', 'reverse']);

      delete props.announce;
      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, CLASS_ROOT + '--interactive', props.onClick), _defineProperty(_classnames, CLASS_ROOT + '--active', active), _classnames), className);

      var unitsSpan = void 0;
      if (units) {
        unitsSpan = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__units' },
          units
        );
      }

      var labelSpan = void 0;
      if (label) {
        labelSpan = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          label
        );
      }

      var contentNode = void 0;
      if (reverse) {
        contentNode = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__value' },
            value
          ),
          unitsSpan,
          icon
        );
      } else {
        contentNode = _react2.default.createElement(
          'div',
          null,
          icon,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__value' },
            value
          ),
          unitsSpan
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref) {
            return _this2.valueRef = _ref;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__annotated' },
          contentNode,
          trendIcon
        ),
        labelSpan
      );
    }
  }]);

  return Value;
}(_react.Component);

Value.displayName = 'Value';
exports.default = Value;


Value.propTypes = {
  active: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(['start', 'center', 'end']),
  announce: _propTypes2.default.bool,
  colorIndex: _propTypes2.default.string,
  icon: _propTypes2.default.node,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onClick: _propTypes2.default.func,
  responsive: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  trendIcon: _propTypes2.default.node,
  reverse: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.node]),
  units: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
};

Value.defaultProps = {
  align: 'center',
  announce: false
};
module.exports = exports['default'];