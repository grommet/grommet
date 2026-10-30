"use strict";

exports.__esModule = true;
exports.PaginationSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["messages", "numberItems", "page", "step"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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