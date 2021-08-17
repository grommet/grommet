"use strict";

exports.__esModule = true;
exports.StackPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    anchor: _propTypes["default"].oneOf(['center', 'left', 'right', 'top', 'bottom', 'top-left', 'bottom-left', 'top-right', 'bottom-right']),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    guidingChild: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['first', 'last'])]),
    interactiveChild: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['first', 'last'])])
  });
}

var StackPropTypes = PropType;
exports.StackPropTypes = StackPropTypes;