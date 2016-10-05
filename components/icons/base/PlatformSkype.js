'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialSkype = require('./SocialSkype');

var _SocialSkype2 = _interopRequireDefault(_SocialSkype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PlatformSkype has been renamed to SocialSkype.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialSkype2.default, props);
};

module.exports = exports['default'];