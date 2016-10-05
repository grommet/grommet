'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentZip = require('./DocumentZip');

var _DocumentZip2 = _interopRequireDefault(_DocumentZip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DocumentCompress has been renamed to DocumentZip.' + ' Plese update your import statement.');
  return _react2.default.createElement(_DocumentZip2.default, props);
};

module.exports = exports['default'];