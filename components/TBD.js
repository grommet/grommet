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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TBD;

var TBD = function (_Component) {
  (0, _inherits3.default)(TBD, _Component);

  function TBD() {
    (0, _classCallCheck3.default)(this, TBD);
    return (0, _possibleConstructorReturn3.default)(this, (TBD.__proto__ || (0, _getPrototypeOf2.default)(TBD)).apply(this, arguments));
  }

  (0, _createClass3.default)(TBD, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT },
        'TBD'
      );
    }
  }]);
  return TBD;
}(_react.Component);

TBD.displayName = 'TBD';
exports.default = TBD;
module.exports = exports['default'];