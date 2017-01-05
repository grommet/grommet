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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VALUE;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Value = function (_Component) {
  (0, _inherits3.default)(Value, _Component);

  function Value() {
    (0, _classCallCheck3.default)(this, Value);
    return (0, _possibleConstructorReturn3.default)(this, (Value.__proto__ || (0, _getPrototypeOf2.default)(Value)).apply(this, arguments));
  }

  (0, _createClass3.default)(Value, [{
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
          size = _props.size,
          trendIcon = _props.trendIcon,
          units = _props.units,
          value = _props.value,
          props = (0, _objectWithoutProperties3.default)(_props, ['active', 'align', 'className', 'colorIndex', 'icon', 'label', 'size', 'trendIcon', 'units', 'value']);

      delete props.announce;
      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + align, align), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--interactive', props.onClick), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--active', active), _classnames), className);

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

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2.valueRef = _ref;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__annotated' },
          icon,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__value' },
            value
          ),
          unitsSpan,
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
  active: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  announce: _react.PropTypes.bool,
  colorIndex: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
  onClick: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  trendIcon: _react.PropTypes.node,
  value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.node]),
  units: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node])
};

Value.defaultProps = {
  align: 'center',
  announce: false
};
module.exports = exports['default'];