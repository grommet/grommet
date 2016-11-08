'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Basket = require('./Basket');

var _Basket2 = _interopRequireDefault(_Basket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('ShopBasket has been renamed to Basket.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Basket2.default, props);
};

module.exports = exports['default'];