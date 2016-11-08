'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Columns = require('./Columns');

var _Columns2 = _interopRequireDefault(_Columns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DivideFour has been renamed to Columns.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Columns2.default, props);
};

module.exports = exports['default'];