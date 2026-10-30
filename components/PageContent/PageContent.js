"use strict";

exports.__esModule = true;
exports.PageContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Page = require("../Page");
var _propTypes = require("./propTypes");
var _excluded = ["children", "background"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PageContent = exports.PageContent = function PageContent(_ref) {
  var children = _ref.children,
    background = _ref.background,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_Page.PageContext),
    pageContext = _extends({}, (_objectDestructuringEmpty(_useContext), _useContext));
  if (background != null && background.fill) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      background: background
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      fill: "horizontal"
    }, pageContext, rest), children));
  }
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    fill: "horizontal",
    background: background
  }, pageContext, rest), children);
};
PageContent.displayName = 'PageContent';
PageContent.propTypes = _propTypes.PageContentPropTypes;