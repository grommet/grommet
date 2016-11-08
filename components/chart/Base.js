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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_BASE;

// Placeholder that reserves space on the screen for Layers to be
// positioned over.

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var Base = function (_Component) {
  (0, _inherits3.default)(Base, _Component);

  function Base() {
    (0, _classCallCheck3.default)(this, Base);
    return (0, _possibleConstructorReturn3.default)(this, (Base.__proto__ || (0, _getPrototypeOf2.default)(Base)).apply(this, arguments));
  }

  (0, _createClass3.default)(Base, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          height = _props.height,
          vertical = _props.vertical,
          width = _props.width,
          props = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'height', 'vertical', 'width']);

      var childCount = _react.Children.count(children);
      var finalHeight = !childCount && !height ? 'medium' : height;
      var finalWidth = !childCount && !width ? 'medium' : width;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--height-' + finalHeight, finalHeight), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--width-' + finalWidth, finalWidth), _classnames), className);

      var mappedChildren = children;
      // We can't distribute children when vertical because our height isn't
      // known.
      if (!vertical) {
        (function () {
          // Round to hundredths of a % so things line up reasonably accurately
          var basis = Math.floor(10000 / childCount) / 100.0 + '%';
          mappedChildren = _react.Children.map(children, function (child) {
            return child ? _react2.default.cloneElement(child, { style: { flexBasis: basis } }) : child;
          });
        })();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { className: classes }),
        mappedChildren
      );
    }
  }]);
  return Base;
}(_react.Component);

Base.displayName = 'Base';
exports.default = Base;
;

Base.propTypes = {
  height: _react.PropTypes.oneOf(['small', 'medium', 'large', 'sparkline']),
  vertical: _react.PropTypes.bool,
  width: _react.PropTypes.oneOf(['small', 'medium', 'large', 'full'])
};
module.exports = exports['default'];