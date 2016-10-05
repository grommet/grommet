'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Inspect = require('./Inspect');

var _Inspect2 = _interopRequireDefault(_Inspect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('QuickView has been renamed to Inspect.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Inspect2.default, props);
};

module.exports = exports['default'];