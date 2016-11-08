'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentStore = require('./DocumentStore');

var _DocumentStore2 = _interopRequireDefault(_DocumentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('DocumentData has been renamed to DocumentStore.' + ' Plese update your import statement.');
  return _react2.default.createElement(_DocumentStore2.default, props);
};

module.exports = exports['default'];