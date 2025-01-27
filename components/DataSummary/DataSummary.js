"use strict";

exports.__esModule = true;
exports.DataSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Text = require("../Text");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["messages"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DataSummary = exports.DataSummary = function DataSummary(_ref) {
  var messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_DataContext.DataContext),
    filteredTotal = _useContext2.filteredTotal,
    dataMessages = _useContext2.messages,
    selected = _useContext2.selected,
    total = _useContext2.total;
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
    margin: {
      vertical: 'xsmall'
    }
  }, rest), format({
    id: messageId,
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      filteredTotal: filteredTotal,
      total: total,
      items: items
    }
  }), selected > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    margin: {
      horizontal: 'small'
    }
  }, "|"), /*#__PURE__*/_react["default"].createElement(_Text.Text, null, format({
    id: 'dataSummary.selected',
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      selected: selected
    }
  }))) : undefined);
};
DataSummary.propTypes = _propTypes.DataSummaryPropTypes;