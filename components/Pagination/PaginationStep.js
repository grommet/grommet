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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
    "aria-label": formatMessage({
      id: 'pagination.stepLabel',
      messages: messages
    }),
    valueLabel: /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.global.input, {
      pad: theme.global.input.padding
    }), /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.global.input.font, step)),
    onChange: onChange
  }));
};