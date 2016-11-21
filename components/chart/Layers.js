'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_LAYERS; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var Layers = function (_Component) {
  (0, _inherits3.default)(Layers, _Component);

  function Layers() {
    (0, _classCallCheck3.default)(this, Layers);
    return (0, _possibleConstructorReturn3.default)(this, (Layers.__proto__ || (0, _getPrototypeOf2.default)(Layers)).apply(this, arguments));
  }

  (0, _createClass3.default)(Layers, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          height = _props.height,
          width = _props.width,
          props = (0, _objectWithoutProperties3.default)(_props, ['className', 'height', 'width']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var style = (0, _extends3.default)({}, this.props.style);
      if (height) {
        style.height = height + 'px';
      }
      if (width) {
        style.width = width + 'px';
      }

      var children = _react.Children.map(this.props.children, function (child) {
        if (child) {
          return _react2.default.cloneElement(child, { width: width, height: height });
        } else {
          return child;
        }
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { className: classes, style: style }),
        children
      );
    }
  }]);
  return Layers;
}(_react.Component);

Layers.displayName = 'Layers';
exports.default = Layers;
;

Layers.propTypes = {
  height: _react.PropTypes.number, // only from Chart
  width: _react.PropTypes.number // only from Chart
};
module.exports = exports['default'];