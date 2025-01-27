"use strict";

exports.__esModule = true;
exports.PaginationSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["messages", "numberItems", "page", "step"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PaginationSummary = exports.PaginationSummary = function PaginationSummary(_ref) {
  var messages = _ref.messages,
    numberItems = _ref.numberItems,
    page = _ref.page,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    formatMessage = _useContext.format;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, rest, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, numberItems > 0 ? formatMessage({
    id: 'pagination.summary',
    messages: messages,
    values: {
      start: "" + ((page - 1) * step + 1),
      end: "" + Math.min(page * step, numberItems),
      total: numberItems
    }
  }) : formatMessage({
    id: 'pagination.summaryNoItems',
    messages: messages
  })));
};