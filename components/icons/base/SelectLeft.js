'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('SelectLeft has been renamed to Selection.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Selection2.default, props);
};

module.exports = exports['default'];