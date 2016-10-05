'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Deploy = require('./Deploy');

var _Deploy2 = _interopRequireDefault(_Deploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Deployment has been renamed to Deploy.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Deploy2.default, props);
};

module.exports = exports['default'];