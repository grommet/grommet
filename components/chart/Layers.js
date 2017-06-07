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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_LAYERS;

var Layers = function (_Component) {
  _inherits(Layers, _Component);

  function Layers() {
    _classCallCheck(this, Layers);

    return _possibleConstructorReturn(this, (Layers.__proto__ || Object.getPrototypeOf(Layers)).apply(this, arguments));
  }

  _createClass(Layers, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          height = _props.height,
          width = _props.width,
          props = _objectWithoutProperties(_props, ['className', 'height', 'width']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var style = _extends({}, this.props.style);
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
        _extends({}, props, { className: classes, style: style }),
        children
      );
    }
  }]);

  return Layers;
}(_react.Component);

Layers.displayName = 'Layers';
exports.default = Layers;


Layers.propTypes = {
  height: _propTypes2.default.number, // only from Chart
  width: _propTypes2.default.number // only from Chart
};
module.exports = exports['default'];