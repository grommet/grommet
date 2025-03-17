var _excluded = ["children", "full", "containerTarget", "theme", "options", "messages", "onAnalytics"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ContainerTargetContext, ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, backgroundIsDark, deviceResponsive, getBreakpoint, normalizeColor, useForwardedRef } from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';
import { RootsContext } from '../../contexts/RootsContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { format as _format, MessageContext } from '../../contexts/MessageContext';
import defaultMessages from '../../languages/default.json';
import { GrommetPropTypes } from './propTypes';
import { AnalyticsProvider } from '../../contexts/AnalyticsContext';
var FullGlobalStyle = createGlobalStyle(["body{margin:0;}"]);
var defaultOptions = {};
var Grommet = /*#__PURE__*/forwardRef(function (props, ref) {
  var children = props.children,
    full = props.full,
    _props$containerTarge = props.containerTarget,
    containerTarget = _props$containerTarge === void 0 ? typeof document === 'object' ? document.body : undefined : _props$containerTarge,
    themeProp = props.theme,
    _props$options = props.options,
    options = _props$options === void 0 ? defaultOptions : _props$options,
    messagesProp = props.messages,
    onAnalytics = props.onAnalytics,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var background = props.background,
    dir = props.dir,
    themeMode = props.themeMode,
    userAgent = props.userAgent;
  var _useState = useState(),
    stateResponsive = _useState[0],
    setResponsive = _useState[1];
  var theme = useMemo(function () {
    var nextTheme = deepMerge(baseTheme, themeProp || {});

    // if user provides specific menu alignment, we don't want
    // the defaults to be included at all (can cause issues with controlMirror)
    // override merged value with themeProp value
    if (themeProp && themeProp.menu && themeProp.menu.drop && themeProp.menu.drop.align) {
      delete nextTheme.menu.drop.align;
      nextTheme.menu.drop.align = themeProp.menu.drop.align;
    }
    var themeBackground = nextTheme.global.colors.background;
    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';
    if (themeMode === 'auto' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      nextTheme.dark = true;
    }
    var color = normalizeColor(background || themeBackground, nextTheme);
    nextTheme.dark = backgroundIsDark(color, nextTheme);
    nextTheme.baseBackground = background || themeBackground;
    // This allows DataTable to intelligently set the background of a pinned
    // header or footer.
    nextTheme.background = nextTheme.baseBackground;
    if (dir) {
      nextTheme.dir = dir;
    }
    return nextTheme;
  }, [background, dir, themeMode, themeProp]);
  var messages = useMemo(function () {
    // combine the passed in messages, if any, with the default
    // messages and format function.
    var nextMessages = deepMerge(defaultMessages, (messagesProp == null ? void 0 : messagesProp.messages) || {});
    return {
      messages: nextMessages,
      format: function format(opts) {
        var message = (messagesProp == null ? void 0 : messagesProp.format) && messagesProp.format(opts);
        return typeof message !== 'undefined' ? message : _format(opts, nextMessages);
      }
    };
  }, [messagesProp]);
  useEffect(function () {
    var onResize = function onResize() {
      setResponsive(getBreakpoint(document.body.clientWidth, theme));
    };
    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);
  var responsive = stateResponsive || deviceResponsive(userAgent, theme) || theme.global.deviceBreakpoints.tablet;
  var grommetRef = useForwardedRef(ref);

  // track open FocusedContainers in a global array to manage
  // focus event listeners for trapFocus
  var roots = useRef([]);
  useEffect(function () {
    if (grommetRef.current) roots.current.push(grommetRef.current);
  }, [grommetRef]);
  var rootsContextValue = useMemo(function () {
    return {
      roots: roots
    };
  }, []);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/React.createElement(RootsContext.Provider, {
    value: rootsContextValue
  }, /*#__PURE__*/React.createElement(ContainerTargetContext.Provider, {
    value: containerTarget
  }, /*#__PURE__*/React.createElement(OptionsContext.Provider, {
    value: options
  }, /*#__PURE__*/React.createElement(MessageContext.Provider, {
    value: messages
  }, /*#__PURE__*/React.createElement(AnalyticsProvider, {
    onAnalytics: onAnalytics
  }, /*#__PURE__*/React.createElement(StyledGrommet, _extends({
    full: full
  }, rest, {
    ref: grommetRef
  }), children), full && /*#__PURE__*/React.createElement(FullGlobalStyle, null))))))));
});
Grommet.displayName = 'Grommet';
Grommet.propTypes = GrommetPropTypes;
export { Grommet };