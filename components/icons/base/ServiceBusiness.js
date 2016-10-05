'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BusinessService = require('./BusinessService');

var _BusinessService2 = _interopRequireDefault(_BusinessService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ServiceBusiness has been renamed to BusinessService.' + ' Plese update your import statement.');
  return _react2.default.createElement(_BusinessService2.default, props);
};

module.exports = exports['default'];