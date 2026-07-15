"use strict";

exports.__esModule = true;
exports.PageControl = void 0;
var _react = _interopRequireDefault(require("react"));
var _StyledPageControl = require("./StyledPageControl");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["control", "separator", "size"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PageControl = exports.PageControl = function PageControl(_ref) {
  var control = _ref.control,
    separator = _ref.separator,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var size = sizeProp || 'medium';
  return /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledContainer, _extends({
    as: "li",
    size: size
  }, passThemeFlag), separator ? /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledSeparator, _extends({
    size: size
  }, passThemeFlag), "\u2026") : /*#__PURE__*/_react["default"].createElement(_StyledPageControl.StyledPaginationButton, _extends({
    a11yTitle: "Go to page " + control,
    fill: true,
    kind: theme.pagination.button,
    label: control,
    size: size
  }, passThemeFlag, rest)));
};