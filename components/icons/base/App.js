'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Apps = require('./Apps');

var _Apps2 = _interopRequireDefault(_Apps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('App has been renamed to Apps.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Apps2.default, props);
};

module.exports = exports['default'];