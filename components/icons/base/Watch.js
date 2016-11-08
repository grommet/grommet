'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CirclePlay = require('./CirclePlay');

var _CirclePlay2 = _interopRequireDefault(_CirclePlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Watch has been renamed to CirclePlay.' + ' Plese update your import statement.');
  return _react2.default.createElement(_CirclePlay2.default, props);
};

module.exports = exports['default'];