'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Configure = require('./Configure');

var _Configure2 = _interopRequireDefault(_Configure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Configuration has been renamed to Configure.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Configure2.default, props);
};

module.exports = exports['default'];