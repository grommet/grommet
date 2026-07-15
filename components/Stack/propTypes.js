"use strict";

exports.__esModule = true;
exports.StackPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    anchor: _propTypes["default"].oneOf(['center', 'left', 'right', 'top', 'bottom', 'top-left', 'bottom-left', 'top-right', 'bottom-right']),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    guidingChild: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['first', 'last'])]),
    interactiveChild: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['first', 'last'])])
  });
}
var StackPropTypes = exports.StackPropTypes = PropType;