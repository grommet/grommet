"use strict";

exports.__esModule = true;
exports.Toolbar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _responsive = require("../../utils/responsive");
var _excluded = ["children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var defaultLayoutProps = {
  direction: 'row',
  align: 'start',
  gap: 'small'
};
var smallLayoutProps = {
  direction: 'row',
  wrap: true,
  align: 'start',
  gap: 'small'
};
var Toolbar = exports.Toolbar = function Toolbar(_ref) {
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var layoutProps = (0, _responsive.isSmall)(size) ? smallLayoutProps : defaultLayoutProps;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    cssGap: true
  }, layoutProps, rest), children);
};
Toolbar.propTypes = _propTypes.ToolbarPropTypes;