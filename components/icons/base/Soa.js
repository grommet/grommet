'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Services = require('./Services');

var _Services2 = _interopRequireDefault(_Services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Soa has been renamed to Services.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Services2.default, props);
};

module.exports = exports['default'];