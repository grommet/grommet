'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialMastercard = require('./SocialMastercard');

var _SocialMastercard2 = _interopRequireDefault(_SocialMastercard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PaymentMastercard has been renamed to SocialMastercard.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialMastercard2.default, props);
};

module.exports = exports['default'];