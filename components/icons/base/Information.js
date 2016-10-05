'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Information has been renamed to Info.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Info2.default, props);
};

module.exports = exports['default'];