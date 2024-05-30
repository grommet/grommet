"use strict";

exports.__esModule = true;
exports.PageHeaderPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
var _propTypes2 = require("../Grid/propTypes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    actions: _propTypes["default"].element,
    gridProps: _propTypes2.GridPropTypes,
    parent: _propTypes["default"].element,
    responsive: _propTypes["default"].bool,
    size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
    level: _propTypes["default"].oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    subtitle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
  });
}
var PageHeaderPropTypes = exports.PageHeaderPropTypes = PropType;