'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShieldSecurity = require('./ShieldSecurity');

var _ShieldSecurity2 = _interopRequireDefault(_ShieldSecurity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ShieldConfigure has been renamed to ShieldSecurity.' + ' Plese update your import statement.');
  return _react2.default.createElement(_ShieldSecurity2.default, props);
};

module.exports = exports['default'];