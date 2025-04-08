import React, { useEffect, useState } from 'react';
import { ResponsiveContainerContext, ResponsiveContext } from '../../contexts';
import { deviceResponsive, getBreakpoint } from '../../utils/responsive';

// The value of ResponsiveContainerContext
// when we're within a responsive container
var responsiveContainerValue = true;
export var ResponsiveContainerProvider = function ResponsiveContainerProvider(_ref) {
  var container = _ref.container,
    theme = _ref.theme,
    children = _ref.children;
  var _useState = useState(function () {
      var _theme$global;
      return deviceResponsive(navigator.userAgent, theme) || (theme == null || (_theme$global = theme.global) == null ? void 0 : _theme$global.deviceBreakpoints.tablet);
    }),
    value = _useState[0],
    setValue = _useState[1];
  useEffect(function () {
    if (!container) return undefined;

    // Track what breakpoint width of the container is at
    // and update the ResponsiveContext value accordingly.
    var resizeObserver;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        window.requestAnimationFrame(function () {
          var _entries$;
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          var size = (_entries$ = entries[0]) == null || (_entries$ = _entries$.borderBoxSize) == null || (_entries$ = _entries$[0]) == null ? void 0 : _entries$.inlineSize;
          if (size) {
            setValue(getBreakpoint(size, theme));
          }
        });
      });
      resizeObserver.observe(container);
    }
    // Initial size for ResponsiveContext in responsive container mode.
    // Also is a fallback for server side rendering
    var containerWidth = container.getBoundingClientRect().width;
    setValue(getBreakpoint(containerWidth, theme));
    return function () {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [container, theme]);
  return /*#__PURE__*/React.createElement(ResponsiveContainerContext.Provider, {
    value: responsiveContainerValue
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
    value: value
  }, children));
};