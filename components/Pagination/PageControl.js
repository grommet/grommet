"use strict";

exports.__esModule = true;
exports.PageControl = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _StyledPageControl = require("./StyledPageControl");
var _excluded = ["control", "separator", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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