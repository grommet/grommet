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
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DataSummary = exports.DataSummary = function DataSummary(_ref) {
  var messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_DataContext.DataContext),
    filteredTotal = _useContext2.filteredTotal,
    dataMessages = _useContext2.messages,
    total = _useContext2.total;
  var messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';else messageId = 'dataSummary.filtered';
  } else messageId = 'dataSummary.total';
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    margin: {
      vertical: 'xsmall'
    }
  }, rest), format({
    id: messageId,
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      filteredTotal: filteredTotal,
      total: total
    }
  }));
};
DataSummary.propTypes = _propTypes.DataSummaryPropTypes;