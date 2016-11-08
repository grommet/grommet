'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CaretNext = require('./CaretNext');

var _CaretNext2 = _interopRequireDefault(_CaretNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('TabNext has been renamed to CaretNext.' + ' Plese update your import statement.');
  return _react2.default.createElement(_CaretNext2.default, props);
};

module.exports = exports['default'];