"use strict";

exports.__esModule = true;
exports.Toolbar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _responsive = require("../../utils/responsive");
var _excluded = ["children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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