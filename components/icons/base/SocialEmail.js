'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialMail = require('./SocialMail');

var _SocialMail2 = _interopRequireDefault(_SocialMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('SocialEmail has been renamed to SocialMail.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialMail2.default, props);
};

module.exports = exports['default'];