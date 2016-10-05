'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CaretUp = require('./CaretUp');

var _CaretUp2 = _interopRequireDefault(_CaretUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('TabUp has been renamed to CaretUp.' + ' Plese update your import statement.');
  return _react2.default.createElement(_CaretUp2.default, props);
};

module.exports = exports['default'];