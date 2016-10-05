'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentExe = require('./DocumentExe');

var _DocumentExe2 = _interopRequireDefault(_DocumentExe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DocumentExecutable has been renamed to DocumentExe.' + ' Plese update your import statement.');
  return _react2.default.createElement(_DocumentExe2.default, props);
};

module.exports = exports['default'];