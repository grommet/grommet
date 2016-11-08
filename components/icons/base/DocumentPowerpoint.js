'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentPpt = require('./DocumentPpt');

var _DocumentPpt2 = _interopRequireDefault(_DocumentPpt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DocumentPowerpoint has been renamed to DocumentPpt.' + ' Plese update your import statement.');
  return _react2.default.createElement(_DocumentPpt2.default, props);
};

module.exports = exports['default'];