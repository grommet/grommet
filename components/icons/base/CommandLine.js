'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cli = require('./Cli');

var _Cli2 = _interopRequireDefault(_Cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('CommandLine has been renamed to Cli.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Cli2.default, props);
};

module.exports = exports['default'];