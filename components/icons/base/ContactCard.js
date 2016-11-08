'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContactInfo = require('./ContactInfo');

var _ContactInfo2 = _interopRequireDefault(_ContactInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ContactCard has been renamed to ContactInfo.' + ' Plese update your import statement.');
  return _react2.default.createElement(_ContactInfo2.default, props);
};

module.exports = exports['default'];