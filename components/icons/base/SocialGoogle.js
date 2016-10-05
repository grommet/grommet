'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlatformGoogle = require('./PlatformGoogle');

var _PlatformGoogle2 = _interopRequireDefault(_PlatformGoogle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('SocialGoogle has been renamed to PlatformGoogle.' + ' Plese update your import statement.');
  return _react2.default.createElement(_PlatformGoogle2.default, props);
};

module.exports = exports['default'];