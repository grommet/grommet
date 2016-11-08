'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Splits = require('./Splits');

var _Splits2 = _interopRequireDefault(_Splits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DivideThree has been renamed to Splits.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Splits2.default, props);
};

module.exports = exports['default'];