var _excluded = ["children", "full", "containerTarget", "theme", "options", "messages"];

var _templateObject;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ContainerTargetContext, ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, backgroundIsDark, getBreakpoint, getDeviceBreakpoint, normalizeColor, useForwardedRef } from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';
import { RootsContext } from '../../contexts/RootsContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { format as _format, MessageContext } from '../../contexts/MessageContext';
import defaultMessages from '../../languages/default.json';
import { GrommetPropTypes } from './propTypes';
var FullGlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  body { margin: 0; }\n"])));

var deviceResponsive = function deviceResponsive(userAgent, theme) {
  // log('--deviceResponsive', userAgent, theme);

  /*
   * Regexes provided for mobile and tablet detection are meant to replace
   * a full-featured specific library due to contributing a considerable size
   * into the bundle.
   *
   * User agents found https://deviceatlas.com/blog/list-of-user-agent-strings
   */
  if (userAgent) {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
      return getDeviceBreakpoint('tablet', theme);
    }

    if (/Mobile|iPhone|Android/.test(userAgent)) {
      return getDeviceBreakpoint('phone', theme);
    }

    return getDeviceBreakpoint('computer', theme);
  }

  return undefined;
};

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
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var background = props.background,
      dir = props.dir,
      themeMode = props.themeMode,
      userAgent = props.userAgent;

  var _useState = useState(),
      stateResponsive = _useState[0],
      setResponsive = _useState[1];

  var theme = useMemo(function () {
    var nextTheme = deepMerge(baseTheme, themeProp || {}); // if user provides specific menu alignment, we don't want
    // the defaults to be included at all (can cause issues with controlMirror)
    // override merged value with themeProp value

    if (themeProp && themeProp.menu && themeProp.menu.drop && themeProp.menu.drop.align) {
      delete nextTheme.menu.drop.align;
      nextTheme.menu.drop.align = themeProp.menu.drop.align;
    }

    var themeBackground = nextTheme.global.colors.background;
    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';
    var color = normalizeColor(background || themeBackground, nextTheme);
    nextTheme.dark = backgroundIsDark(color, nextTheme);
    nextTheme.baseBackground = background || themeBackground; // This allows DataTable to intelligently set the background of a pinned
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
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/React.createElement(RootsContext.Provider, {
    value: [grommetRef.current]
  }, /*#__PURE__*/React.createElement(ContainerTargetContext.Provider, {
    value: containerTarget
  }, /*#__PURE__*/React.createElement(OptionsContext.Provider, {
    value: options
  }, /*#__PURE__*/React.createElement(MessageContext.Provider, {
    value: messages
  }, /*#__PURE__*/React.createElement(StyledGrommet, _extends({
    full: full
  }, rest, {
    ref: grommetRef
  }), children), full && /*#__PURE__*/React.createElement(FullGlobalStyle, null)))))));
});
Grommet.displayName = 'Grommet';
Grommet.propTypes = GrommetPropTypes;
export { Grommet };