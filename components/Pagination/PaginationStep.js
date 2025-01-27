"use strict";

exports.__esModule = true;
exports.PaginationStep = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Select = require("../Select");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["messages", "onChange", "options", "step"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PaginationStep = exports.PaginationStep = function PaginationStep(_ref) {
  var messages = _ref.messages,
    onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [10, 25, 50, 100] : _ref$options,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    formatMessage = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    direction: "row",
    align: "center",
    gap: "xsmall"
  }, rest), /*#__PURE__*/_react["default"].createElement(_Text.Text, null, formatMessage({
    id: 'pagination.stepLabel',
    messages: messages
  })), /*#__PURE__*/_react["default"].createElement(_Select.Select, {
    options: options,
    value: step,
    valueLabel: /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.global.input, {
      pad: theme.global.input.padding
    }), /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.global.input.font, step)),
    onChange: onChange
  }));
};