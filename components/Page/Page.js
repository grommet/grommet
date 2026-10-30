"use strict";

exports.__esModule = true;
exports.Page = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _PageContext = require("./PageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["kind"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Page = exports.Page = function Page(_ref) {
  var _ref$kind = _ref.kind,
    kind = _ref$kind === void 0 ? 'wide' : _ref$kind,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var contentValue = (0, _react.useMemo)(function () {
    var _theme$page$kind, _theme$page$kind2;
    return _extends({
      alignSelf: (_theme$page$kind = theme.page[kind]) == null ? void 0 : _theme$page$kind.alignSelf,
      width: (_theme$page$kind2 = theme.page[kind]) == null ? void 0 : _theme$page$kind2.width
    }, theme.page[kind][size]);
  }, [theme, size, kind]);
  return /*#__PURE__*/_react["default"].createElement(_PageContext.PageContext.Provider, {
    value: contentValue
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    fill: "horizontal"
  }, rest)));
};
Page.displayName = 'Page';
Page.propTypes = _propTypes.PagePropTypes;