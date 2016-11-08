'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Announce = require('./Announce');

var _Announce2 = _interopRequireDefault(_Announce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Announcement has been renamed to Announce.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Announce2.default, props);
};

module.exports = exports['default'];