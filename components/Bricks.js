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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.BRICKS; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Bricks = function (_Component) {
  (0, _inherits3.default)(Bricks, _Component);

  function Bricks() {
    (0, _classCallCheck3.default)(this, Bricks);
    return (0, _possibleConstructorReturn3.default)(this, (Bricks.__proto__ || (0, _getPrototypeOf2.default)(Bricks)).apply(this, arguments));
  }

  (0, _createClass3.default)(Bricks, [{
    key: 'render',
    value: function render() {
      console.warn('Bricks: component has been deprecated. Use Box instead.');
      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);

      return _react2.default.createElement(
        'div',
        { className: classes },
        this.props.children
      );
    }
  }]);
  return Bricks;
}(_react.Component);

Bricks.displayName = 'Bricks';
exports.default = Bricks;
;

// remove in 1.0, use Box

Bricks.displayName = 'Bricks';
module.exports = exports['default'];