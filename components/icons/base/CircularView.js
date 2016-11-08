'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nodes = require('./Nodes');

var _Nodes2 = _interopRequireDefault(_Nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('CircularView has been renamed to Nodes.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Nodes2.default, props);
};

module.exports = exports['default'];