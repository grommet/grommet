"use strict";

exports.__esModule = true;
exports.DataSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Text = require("../Text");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _propTypes = require("./propTypes");
var _excluded = ["messages"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DataSummary = exports.DataSummary = function DataSummary(_ref) {
  var _theme$dataSummary, _theme$dataSummary2;
  var messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_DataContext.DataContext),
    filteredTotal = _useContext2.filteredTotal,
    dataMessages = _useContext2.messages,
    selected = _useContext2.selected,
    total = _useContext2.total;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';else messageId = 'dataSummary.filtered';
  } else if (total === 1) messageId = 'dataSummary.totalSingle';else messageId = 'dataSummary.total';

  // helps account for cases like 0 results of 1 item
  var items = format({
    id: total === 1 ? 'dataSummary.itemsSingle' : 'dataSummary.items',
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary)
  });
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    margin: (_theme$dataSummary = theme.dataSummary) == null ? void 0 : _theme$dataSummary.margin
  }, rest), format({
    id: messageId,
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      filteredTotal: filteredTotal,
      total: total,
      items: items
    }
  }), selected > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    margin: (_theme$dataSummary2 = theme.dataSummary) == null || (_theme$dataSummary2 = _theme$dataSummary2.separator) == null ? void 0 : _theme$dataSummary2.margin
  }, "|"), /*#__PURE__*/_react["default"].createElement(_Text.Text, null, format({
    id: 'dataSummary.selected',
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      selected: selected
    }
  }))) : undefined);
};
DataSummary.propTypes = _propTypes.DataSummaryPropTypes;