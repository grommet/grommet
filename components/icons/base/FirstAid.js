'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Aid = require('./Aid');

var _Aid2 = _interopRequireDefault(_Aid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('FirstAid has been renamed to Aid.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Aid2.default, props);
};

module.exports = exports['default'];