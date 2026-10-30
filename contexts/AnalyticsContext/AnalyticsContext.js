"use strict";

exports.__esModule = true;
exports.useAnalytics = exports.AnalyticsProvider = exports.AnalyticsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var AnalyticsContext = exports.AnalyticsContext = /*#__PURE__*/_react["default"].createContext(function () {});
var useAnalytics = exports.useAnalytics = function useAnalytics() {
  return (0, _react.useContext)(AnalyticsContext);
};
var AnalyticsProvider = exports.AnalyticsProvider = function AnalyticsProvider(_ref) {
  var onAnalytics = _ref.onAnalytics,
    children = _ref.children;
  var lastUrlRef = (0, _react.useRef)();
  var sendAnalytics = (0, _react.useCallback)(function (data) {
    return onAnalytics && onAnalytics(data);
  }, [onAnalytics]);
  (0, _react.useEffect)(function () {
    var observer;
    if (onAnalytics) {
      observer = new window.MutationObserver(function () {
        var _window;
        var url = (_window = window) == null || (_window = _window.location) == null ? void 0 : _window.href;
        var previousUrl = lastUrlRef.current;
        if (url !== previousUrl) {
          lastUrlRef.current = url;
          sendAnalytics({
            type: 'pageView',
            url: url,
            previousUrl: previousUrl
          });
        }
      });
      observer.observe(document, {
        subtree: true,
        childList: true
      });
    }
    return function () {
      var _observer;
      return (_observer = observer) == null ? void 0 : _observer.disconnect();
    };
  }, [sendAnalytics, onAnalytics]);
  return /*#__PURE__*/_react["default"].createElement(AnalyticsContext.Provider, {
    value: sendAnalytics
  }, children);
};