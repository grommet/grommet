"use strict";

exports.__esModule = true;
exports.useAnalytics = exports.AnalyticsProvider = exports.AnalyticsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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