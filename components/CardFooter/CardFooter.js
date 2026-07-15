"use strict";

exports.__esModule = true;
exports.CardFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _Footer = require("../Footer");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Needs to have a CardBody or a flex container when Card uses a fixed height.
var CardFooter = exports.CardFooter = function CardFooter(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_Footer.Footer, _extends({}, theme.card.footer, rest));
};