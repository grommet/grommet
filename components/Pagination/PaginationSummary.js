"use strict";

exports.__esModule = true;
exports.PaginationSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["messages", "numberItems", "page", "step"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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