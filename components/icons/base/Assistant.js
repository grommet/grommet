'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Robot = require('./Robot');

var _Robot2 = _interopRequireDefault(_Robot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Assistant has been renamed to Robot.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Robot2.default, props);
};

module.exports = exports['default'];