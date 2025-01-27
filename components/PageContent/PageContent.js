"use strict";

exports.__esModule = true;
exports.PageContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Page = require("../Page");
var _propTypes = require("./propTypes");
var _excluded = ["children", "background"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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