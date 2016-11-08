'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Troubleshoot = require('./Troubleshoot');

var _Troubleshoot2 = _interopRequireDefault(_Troubleshoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Troubleshooting has been renamed to Troubleshoot.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Troubleshoot2.default, props);
};

module.exports = exports['default'];