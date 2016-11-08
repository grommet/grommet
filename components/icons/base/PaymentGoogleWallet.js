'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialGoogleWallet = require('./SocialGoogleWallet');

var _SocialGoogleWallet2 = _interopRequireDefault(_SocialGoogleWallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PaymentGoogleWallet has been renamed to SocialGoogleWallet.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialGoogleWallet2.default, props);
};

module.exports = exports['default'];