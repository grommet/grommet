"use strict";

exports.__esModule = true;
exports.useAnalytics = exports.AnalyticsProvider = exports.AnalyticsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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