function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
import MobileDetect from 'mobile-detect';
import { colorIsDark } from 'grommet-styles';
import { ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, getBreakpoint, getDeviceBreakpoint } from '../../utils';
import { base as baseTheme } from '../../themes';
import { withDocs } from '../hocs';
import { StyledGrommet } from './StyledGrommet';
var wrapWithHocs = withDocs('Grommet');
var FullGlobalStyle = createGlobalStyle(_templateObject());

var GrommetImpl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(GrommetImpl, _Component);

  function GrommetImpl() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
      var _this$state = _this.state,
          theme = _this$state.theme,
          responsive = _this$state.responsive;
      var breakpoint = getBreakpoint(window.innerWidth, theme);

      if (breakpoint !== responsive) {
        _this.setState({
          responsive: breakpoint
        });
      }
    });

    return _this;
  }

  GrommetImpl.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _nextProps$theme = nextProps.theme,
        theme = _nextProps$theme === void 0 ? {} : _nextProps$theme;
    var stateTheme = prevState.theme,
        themeProp = prevState.themeProp;
    var nextTheme = deepMerge(baseTheme, theme);

    if (!stateTheme || theme !== themeProp) {
      if (typeof theme.dark === 'undefined') {
        // calculate if background is dark or not
        // otherwise respect the property passed in the theme
        var colors = nextTheme.global.colors;
        var color = colors.background;
        nextTheme.dark = color ? colorIsDark(color) : false;
      }

      return {
        theme: nextTheme,
        themeProp: theme
      };
    }

    return null;
  };

  var _proto = GrommetImpl.prototype;

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

    if (userAgent) {
      var md = new MobileDetect(userAgent);

      if (md.phone()) {
        return getDeviceBreakpoint('phone', theme);
      }

      if (md.tablet()) {
        return getDeviceBreakpoint('tablet', theme);
      }

      return getDeviceBreakpoint('computer', theme);
    }

    return undefined;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        full = _this$props.full,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "full"]);

    delete rest.theme;
    var _this$state2 = this.state,
        theme = _this$state2.theme,
        stateResponsive = _this$state2.responsive; // Value from state should be correct once we resize
    // On first render we try to guess otherwise set the default as a tablet

    var responsive = stateResponsive || this.deviceResponsive() || theme.global.deviceBreakpoints.tablet;
    return React.createElement(ThemeContext.Provider, {
      value: theme
    }, React.createElement(ResponsiveContext.Provider, {
      value: responsive
    }, React.createElement(StyledGrommet, _extends({
      full: full
    }, rest), children), full && React.createElement(FullGlobalStyle, null)));
  };

  return GrommetImpl;
}(Component);

_defineProperty(GrommetImpl, "displayName", 'Grommet');

export var Grommet = wrapWithHocs(GrommetImpl);