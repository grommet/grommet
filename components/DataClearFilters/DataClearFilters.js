"use strict";

exports.__esModule = true;
exports.DataClearFilters = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _Button = require("../Button");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["onClick"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DataClearFilters = exports.DataClearFilters = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$data$button;
  var _onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_DataContext.DataContext),
    clearFilters = _useContext2.clearFilters,
    messages = _useContext2.messages;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
    ref: ref,
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: function onClick(event) {
      clearFilters();
      if (_onClick) _onClick(event);
    }
  }, rest));
});
DataClearFilters.displayName = 'DataClearFilters';
DataClearFilters.propTypes = _propTypes.DataClearFiltersPropTypes;