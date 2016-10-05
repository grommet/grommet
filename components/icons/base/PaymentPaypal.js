'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialPaypal = require('./SocialPaypal');

var _SocialPaypal2 = _interopRequireDefault(_SocialPaypal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PaymentPaypal has been renamed to SocialPaypal.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialPaypal2.default, props);
};

module.exports = exports['default'];