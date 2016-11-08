'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialVisa = require('./SocialVisa');

var _SocialVisa2 = _interopRequireDefault(_SocialVisa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PaymentVisa has been renamed to SocialVisa.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialVisa2.default, props);
};

module.exports = exports['default'];