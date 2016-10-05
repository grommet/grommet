'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SocialSquare = require('./SocialSquare');

var _SocialSquare2 = _interopRequireDefault(_SocialSquare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('PaymentSquare has been renamed to SocialSquare.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SocialSquare2.default, props);
};

module.exports = exports['default'];