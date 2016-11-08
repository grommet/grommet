'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Contact = require('./Contact');

var _Contact2 = _interopRequireDefault(_Contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ContactUs has been renamed to Contact.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Contact2.default, props);
};

module.exports = exports['default'];