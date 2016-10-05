'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Optimize = require('./Optimize');

var _Optimize2 = _interopRequireDefault(_Optimize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Optimization has been renamed to Optimize.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Optimize2.default, props);
};

module.exports = exports['default'];