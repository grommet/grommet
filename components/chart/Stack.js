'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Props = require('../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_STACK;

// Equally sized siblings.

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var Stack = function (_Component) {
  (0, _inherits3.default)(Stack, _Component);

  function Stack() {
    (0, _classCallCheck3.default)(this, Stack);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Stack).apply(this, arguments));
  }

  (0, _createClass3.default)(Stack, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var height = _props.height;
      var width = _props.width;
      var vertical = _props.vertical;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Stack.propTypes));

      var classes = [CLASS_ROOT];
      if (vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var style = {};
      if (height) {
        style.height = height + 'px';
      }
      if (width) {
        style.width = width + 'px';
      }

      var children = this.props.children;
      // We can't distribute children when vertical because our height isn't known.
      if (!vertical) {
        (function () {
          // Round to hundredths of a % so things line up reasonably accurately
          var basis = Math.floor(10000 / _react.Children.count(_this2.props.children)) / 100.0 + '%';
          children = _react.Children.map(_this2.props.children, function (child) {
            return child ? _react2.default.cloneElement(child, { style: { flexBasis: basis } }) : child;
          });
        })();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, restProps, { className: classes.join(' '), style: style }),
        children
      );
    }
  }]);
  return Stack;
}(_react.Component);

Stack.displayName = 'Stack';
exports.default = Stack;
;

Stack.propTypes = {
  height: _react.PropTypes.number,
  vertical: _react.PropTypes.bool,
  width: _react.PropTypes.number
};
module.exports = exports['default'];