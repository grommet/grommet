import React, { useCallback, useContext, useEffect, useRef } from 'react';
export var AnalyticsContext = /*#__PURE__*/React.createContext(function () {});
export var useAnalytics = function useAnalytics() {
  return useContext(AnalyticsContext);
};
export var AnalyticsProvider = function AnalyticsProvider(_ref) {
  var onAnalytics = _ref.onAnalytics,
    children = _ref.children;
  var lastUrlRef = useRef();
  var sendAnalytics = useCallback(function (data) {
    return onAnalytics && onAnalytics(data);
  }, [onAnalytics]);
  useEffect(function () {
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
  return /*#__PURE__*/React.createElement(AnalyticsContext.Provider, {
    value: sendAnalytics
  }, children);
};