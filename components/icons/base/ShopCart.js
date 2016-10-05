'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cart = require('./Cart');

var _Cart2 = _interopRequireDefault(_Cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ShopCart has been renamed to Cart.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Cart2.default, props);
};

module.exports = exports['default'];