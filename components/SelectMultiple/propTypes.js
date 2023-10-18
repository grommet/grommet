"use strict";

exports.__esModule = true;
exports.SelectMultiplePropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../Select/propTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _propTypes2.genericSelectProps, {
    defaultValue: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number])),
    help: _propTypes["default"].node,
    limit: _propTypes["default"].number,
    value: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number])),
    showSelectedInline: _propTypes["default"].bool,
    sortSelectedOnClose: _propTypes["default"].bool
  });
}
var SelectMultiplePropTypes = exports.SelectMultiplePropTypes = PropType;