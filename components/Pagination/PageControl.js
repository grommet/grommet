"use strict";

exports.__esModule = true;
exports.PageControl = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _StyledPageControl = require("./StyledPageControl");
var _excluded = ["control", "separator", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var PageControl = exports.PageControl = function PageControl(_ref) {
  var control = _ref.control,
    separator = _ref.separator,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var size = sizeProp || 'medium';
  return /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledContainer, {
    as: "li",
    size: size
  }, separator ? /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledSeparator, {
    size: size
  }, "\u2026") : /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledPaginationButton, _extends({
    a11yTitle: "Go to page " + control,
    fill: true,
    kind: theme.pagination.button,
    label: control,
    size: size
  }, rest)));
};