import React, { useContext, useEffect, useRef, useState } from 'react';
import { ResponsiveContainerContext, ResponsiveContext, ThemeContext } from '../../contexts';
import { StyledResponsiveContainer } from './StyledResponsiveContainer';
import { deviceResponsive, getBreakpoint } from '../../utils';
var responsiveContainerValue = true;
export var ResponsiveContainer = function ResponsiveContainer(_ref) {
  var _theme$global;
  var children = _ref.children;
  var theme = useContext(ThemeContext);
  var ref = useRef(undefined);
  var _useState = useState(),
    stateResponsive = _useState[0],
    setStateResponsive = _useState[1];
  useEffect(function () {
    var element = ref == null ? void 0 : ref.current;
    if (!element) return undefined;
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
            setStateResponsive(getBreakpoint(size, theme));
          }
        });
      });
      resizeObserver.observe(element);
    } else {
      // fallback for server side rendering
      var _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width;
      setStateResponsive(getBreakpoint(width, theme));
    }
    return function () {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [theme]);
  var responsive = stateResponsive || deviceResponsive(navigator.userAgent, theme) || (theme == null || (_theme$global = theme.global) == null ? void 0 : _theme$global.deviceBreakpoints.tablet);
  return /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/React.createElement(ResponsiveContainerContext.Provider, {
    value: responsiveContainerValue
  }, /*#__PURE__*/React.createElement(StyledResponsiveContainer, {
    ref: ref
  }, children)));
};