'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PersonalComputer = require('./PersonalComputer');

var _PersonalComputer2 = _interopRequireDefault(_PersonalComputer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ComputerPersonal has been renamed to PersonalComputer.' + ' Plese update your import statement.');
  return _react2.default.createElement(_PersonalComputer2.default, props);
};

module.exports = exports['default'];