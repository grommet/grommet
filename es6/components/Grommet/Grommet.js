function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { ThemeContext as IconThemeContext } from "grommet-icons/es6/contexts/ThemeContext";
import { compose } from 'recompose';
import { ResponsiveContext, ThemeContext } from '../../contexts';
import { base as baseTheme } from '../../themes/base';
import { colorIsDark, deepMerge, getBreakpoint, normalizeColor } from '../../utils';
import { withIconTheme } from '../hocs';
import { StyledGrommet } from './StyledGrommet'; // grommet-icons isn't aware of the grommet dark background context.
// Here, we reduce the grommet theme colors to the correct flat color
// namespace for grommet-icons.

var reduceIconTheme = function reduceIconTheme(iconTheme, dark) {
  var result = _extends({}, iconTheme, {
    colors: _extends({}, iconTheme.colors)
  });

  Object.keys(result.colors).forEach(function (key) {
    if (typeof result.colors[key] === 'object') {
      result.colors[key] = normalizeColor(result.colors[key][dark ? 'dark' : 'light'], {
        dark: dark,
        global: {
          colors: result.colors
        }
      });
    } else {
      result.colors[key] = normalizeColor(result.colors[key], {
        dark: dark,
        global: {
          colors: result.colors
        }
      });
    }
  });
  return result;
};

var Grommet =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Grommet, _Component);

  function Grommet() {
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

  Grommet.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var iconTheme = nextProps.iconTheme,
        theme = nextProps.theme;
    var stateTheme = prevState.theme,
        themeProp = prevState.themeProp,
        iconThemeProp = prevState.iconThemeProp;
    var nextTheme;

    if (theme && (theme !== themeProp || iconTheme !== iconThemeProp)) {
      // in case the supplied theme has global.colors but not icon.colors,
      // pre-merge the current base icon colors with the new theme colors.
      var iconColoredTheme = theme;

      if (!theme.icon || !theme.icon.colors) {
        iconColoredTheme = _extends({}, theme);
        iconColoredTheme.icon = _extends({}, theme.icon || {});
        iconColoredTheme.icon.colors = deepMerge(baseTheme.icon.colors, (theme.global || {}).colors);
      }

      nextTheme = deepMerge(baseTheme, iconColoredTheme);
    } else if (!theme && (themeProp || !stateTheme)) {
      nextTheme = baseTheme;
    }

    if (nextTheme) {
      var _ref = nextTheme.global || baseTheme.global,
          colors = _ref.colors;

      var color = colors.background;
      var dark = color ? colorIsDark(color) : false;
      var lightIconTheme = deepMerge(iconTheme, nextTheme.icon);
      var iconThemes = {
        dark: reduceIconTheme(deepMerge(lightIconTheme, {
          color: colors.text.dark
        }), true),
        light: reduceIconTheme(lightIconTheme, false)
      };
      return {
        theme: _extends({}, nextTheme, {
          dark: dark,
          icon: dark ? iconThemes.dark : iconThemes.light,
          iconThemes: iconThemes
        }),
        themeProp: theme,
        iconThemeProp: iconTheme
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

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    delete rest.theme;
    var _this$state2 = this.state,
        responsive = _this$state2.responsive,
        theme = _this$state2.theme;
    return React.createElement(ThemeContext.Provider, {
      value: theme
    }, React.createElement(IconThemeContext.Provider, {
      value: theme.icon
    }, React.createElement(ResponsiveContext.Provider, {
      value: responsive
    }, React.createElement(StyledGrommet, _extends({}, rest, {
      theme: theme
    }), children))));
  };

  return Grommet;
}(Component);

var GrommetDoc;

if (process.env.NODE_ENV !== 'production') {
  GrommetDoc = require('./doc').doc(Grommet); // eslint-disable-line global-require
}

var GrommetWrapper = compose(withIconTheme)(GrommetDoc || Grommet);
export { GrommetWrapper as Grommet };