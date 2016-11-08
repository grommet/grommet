'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchAdvanced = require('./SearchAdvanced');

var _SearchAdvanced2 = _interopRequireDefault(_SearchAdvanced);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('AdvancedSearch has been renamed to SearchAdvanced.' + ' Plese update your import statement.');
  return _react2.default.createElement(_SearchAdvanced2.default, props);
};

module.exports = exports['default'];