'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CaretPrevious = require('./CaretPrevious');

var _CaretPrevious2 = _interopRequireDefault(_CaretPrevious);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('TabPrevious has been renamed to CaretPrevious.' + ' Plese update your import statement.');
  return _react2.default.createElement(_CaretPrevious2.default, props);
};

module.exports = exports['default'];