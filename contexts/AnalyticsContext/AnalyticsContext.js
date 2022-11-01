"use strict";

exports.__esModule = true;
exports.useAnalytics = exports.AnalyticsProvider = exports.AnalyticsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var AnalyticsContext = /*#__PURE__*/_react["default"].createContext(function () {});
exports.AnalyticsContext = AnalyticsContext;
var useAnalytics = function useAnalytics() {
  return (0, _react.useContext)(AnalyticsContext);
};
exports.useAnalytics = useAnalytics;
var AnalyticsProvider = function AnalyticsProvider(_ref) {
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
        var _window, _window$location;
        var url = (_window = window) == null ? void 0 : (_window$location = _window.location) == null ? void 0 : _window$location.href;
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
exports.AnalyticsProvider = AnalyticsProvider;