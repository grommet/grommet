"use strict";

exports.__esModule = true;
exports.PageContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Page = require("../Page");
var _propTypes = require("./propTypes");
var _excluded = ["children", "background"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PageContent = exports.PageContent = function PageContent(_ref) {
  var children = _ref.children,
    background = _ref.background,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_Page.PageContext),
    pageContext = _extends({}, (_objectDestructuringEmpty(_useContext), _useContext));
  if (background != null && background.fill) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      background: background
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      fill: "horizontal"
    }, pageContext, rest), children));
  }
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    fill: "horizontal",
    background: background
  }, pageContext, rest), children);
};
PageContent.displayName = 'PageContent';
PageContent.propTypes = _propTypes.PageContentPropTypes;