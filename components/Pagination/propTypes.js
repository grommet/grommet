"use strict";

exports.__esModule = true;
exports.PaginationPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    numberEdgePages: _propTypes["default"].number,
    numberItems: _propTypes["default"].number,
    numberMiddlePages: _propTypes["default"].number,
    onChange: _propTypes["default"].func,
    page: _propTypes["default"].number,
    size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
    step: _propTypes["default"].number,
    stepOptions: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool, _propTypes["default"].element, _propTypes["default"].object]))]),
    summary: _propTypes["default"].bool
  });
}
var PaginationPropTypes = exports.PaginationPropTypes = PropType;