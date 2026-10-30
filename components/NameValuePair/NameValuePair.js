"use strict";

exports.__esModule = true;
exports.NameValuePair = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _NameValueListContext = require("../NameValueList/NameValueListContext");
var _responsive = require("../../utils/responsive");
var _useThemeValue2 = require("../../utils/useThemeValue");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var NameValuePair = exports.NameValuePair = function NameValuePair(_ref) {
  var _theme$nameValuePair;
  var children = _ref.children,
    nameProp = _ref.name;
  var _useContext = (0, _react.useContext)(_NameValueListContext.NameValueListContext),
    nameProps = _useContext.nameProps,
    pairProps = _useContext.pairProps,
    valueProps = _useContext.valueProps;
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var direction = pairProps == null ? void 0 : pairProps.direction;
  var column = direction === 'column' || direction === 'column-reverse' || (0, _responsive.isSmall)(size);
  var Container = column ? _Box.Box : _react.Fragment;
  var nameAlign = !(0, _responsive.isSmall)(size) ? nameProps == null ? void 0 : nameProps.align : undefined;
  var valueAlign = !(0, _responsive.isSmall)(size) ? valueProps == null ? void 0 : valueProps.align : undefined;
  // using margin to act as gap
  // <dl> elements must only directly contain
  // properly-ordered <dt> and <dd> groups
  var valueGap;
  if (column && (_theme$nameValuePair = theme.nameValuePair) != null && (_theme$nameValuePair = _theme$nameValuePair.column) != null && _theme$nameValuePair.gap) valueGap = {
    bottom: theme.nameValuePair.column.gap
  };
  var name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number') name = /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    as: "dt",
    margin: valueGap,
    textAlign: nameAlign
  }, theme.nameValuePair.name), nameProp);else name = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    as: "dt",
    align: nameAlign
  }, nameProp);
  var value;
  if (typeof children === 'string' || typeof children === 'number') value =
  /*#__PURE__*/
  // override browser default margin for dd
  _react["default"].createElement(_Text.Text, _extends({
    as: "dd",
    margin: "none",
    textAlign: valueAlign
  }, theme.nameValuePair.value), children);else value =
  /*#__PURE__*/
  // override browser default margin for dd
  _react["default"].createElement(_Box.Box, {
    margin: "none",
    as: "dd",
    align: valueAlign
  }, children);
  var first = direction !== 'column-reverse' ? name : value;
  var second = direction !== 'column-reverse' ? value : name;
  return /*#__PURE__*/_react["default"].createElement(Container, null, first, second);
};