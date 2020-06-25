function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  body { margin: 0; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ResponsiveContext, ThemeContext, ContainerTargetContext } from '../../contexts';
import { backgroundIsDark, deepMerge, getBreakpoint, getDeviceBreakpoint, normalizeColor } from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';
var FullGlobalStyle = createGlobalStyle(_templateObject());

var Grommet = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Grommet, _Component);

  function Grommet() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var _this$state = _this.state,
          theme = _this$state.theme,
          responsive = _this$state.responsive;
      var breakpoint; // responsive would be undefined in the case of SSR or initial page load

      if (!responsive) {
        // In the case of SSR we'll need to use the user agent breakpoint
        breakpoint = _this.deviceResponsive();
      } // Initial page load where both responsive and breakpoint are undefined


      if (!breakpoint) breakpoint = getBreakpoint(window.innerWidth, theme);

      if (breakpoint !== responsive) {
        _this.setState({
          responsive: breakpoint
        });
      }
    });

    return _this;
  }

  Grommet.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var backgroundProp = nextProps.background,
        dir = nextProps.dir,
        _nextProps$theme = nextProps.theme,
        theme = _nextProps$theme === void 0 ? {} : _nextProps$theme,
        themeMode = nextProps.themeMode;
    var stateTheme = prevState.theme,
        themeProp = prevState.themeProp,
        themeModeProp = prevState.themeModeProp;
    var nextTheme = deepMerge(baseTheme, theme);

    if (!stateTheme || theme !== themeProp || themeMode !== themeModeProp) {
      var themeBackground = nextTheme.global.colors.background; // get initial value for dark so we can normalize background color

      nextTheme.dark = (themeMode || theme.defaultMode) === 'dark';
      var color = normalizeColor(backgroundProp || themeBackground, nextTheme); // After normalizing, we set nextTheme.dark once more.
      // It is necessary that we set it twice. We have to handle two cases:
      // 1. Caller passes in a color object or a color name that resolves an
      //    object. In this case, we want to set dark as line 38 shows. The
      //    second set, in line 46, is a no-op.
      // 2. Caller passes a specific color value or a color name that resolves
      //    to a specific color value. In this case, we want dark to be set
      //    based on that color, which line 46 will do.
      // The double set of nextTheme.dark allows us to handle both cases here
      // without having to duplicate color object + name + dark mode detection
      // code here that is already in normalizeColor and backgroundIsDark.

      nextTheme.dark = backgroundIsDark(color, nextTheme);
      nextTheme.baseBackground = backgroundProp || themeBackground;

      if (dir) {
        nextTheme.dir = dir;
      }

      return {
        theme: nextTheme,
        themeProp: theme,
        themeModeProp: themeMode
      };
    }

    return null;
  };

  var _proto = Grommet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  };

  _proto.deviceResponsive = function deviceResponsive() {
    var userAgent = this.props.userAgent;
    var theme = this.state.theme;
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

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        full = _this$props.full,
        _this$props$container = _this$props.containerTarget,
        containerTarget = _this$props$container === void 0 ? typeof document === 'object' ? document.body : undefined : _this$props$container,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "full", "containerTarget"]);

    delete rest.theme;
    var _this$state2 = this.state,
        theme = _this$state2.theme,
        stateResponsive = _this$state2.responsive; // Value from state should be correct once we resize
    // On first render we try to guess otherwise set the default as a tablet

    var responsive = stateResponsive || this.deviceResponsive() || theme.global.deviceBreakpoints.tablet;
    return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: theme
    }, /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
      value: responsive
    }, /*#__PURE__*/React.createElement(ContainerTargetContext.Provider, {
      value: containerTarget
    }, /*#__PURE__*/React.createElement(StyledGrommet, _extends({
      full: full
    }, rest), children), full && /*#__PURE__*/React.createElement(FullGlobalStyle, null))));
  };

  return Grommet;
}(Component);

_defineProperty(Grommet, "displayName", 'Grommet');

var GrommetDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  GrommetDoc = require('./doc').doc(Grommet);
}

var GrommetWrapper = GrommetDoc || Grommet;
export { GrommetWrapper as Grommet };