'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = function (_Graph) {
  (0, _inherits3.default)(Bar, _Graph);

  function Bar() {
    (0, _classCallCheck3.default)(this, Bar);
    return (0, _possibleConstructorReturn3.default)(this, (Bar.__proto__ || (0, _getPrototypeOf2.default)(Bar)).apply(this, arguments));
  }

  return Bar;
}(_Graph3.default); // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.default = Bar;
;

Bar.defaultProps = (0, _extends3.default)({}, _Graph3.default.defaultProps, {
  type: 'bar'
});

Bar.displayName = 'Bar';
module.exports = exports['default'];