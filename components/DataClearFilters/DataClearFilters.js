"use strict";

exports.__esModule = true;
exports.DataClearFilters = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _Button = require("../Button");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["onClick"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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