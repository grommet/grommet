'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Split = require('./Split');

var _Split2 = _interopRequireDefault(_Split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Divide has been renamed to Split.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Split2.default, props);
};

module.exports = exports['default'];