'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Validate = require('./Validate');

var _Validate2 = _interopRequireDefault(_Validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Validation has been renamed to Validate.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Validate2.default, props);
};

module.exports = exports['default'];