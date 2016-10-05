'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Schedules = require('./Schedules');

var _Schedules2 = _interopRequireDefault(_Schedules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ScheduleClone has been renamed to Schedules.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Schedules2.default, props);
};

module.exports = exports['default'];