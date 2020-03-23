"use strict";

exports.__esModule = true;
exports.getHoverIndicatorStyle = exports.selectedStyle = exports.activeStyle = exports.backgroundStyle = exports.backgroundIsDark = exports.normalizeBackground = void 0;

var _styledComponents = require("styled-components");

var _colors = require("./colors");

// evalStyle() converts a styled-components item into a string
var evalStyle = function evalStyle(arg, theme) {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({
      theme: theme
    });
  }

  return arg;
};

var normalizeBackground = function normalizeBackground(background, theme) {
  // If the background has a light or dark object, use that
  var result = background;

  if (background) {
    if (theme.dark && background.dark && typeof background.dark !== 'boolean') {
      result = background.dark;
    } else if (!theme.dark && background.light && typeof background.light !== 'boolean') {
      result = background.light;
    }

    result = evalStyle(result, theme);
  }

  return result;
};

exports.normalizeBackground = normalizeBackground;

var backgroundIsDark = function backgroundIsDark(backgroundArg, theme) {
  var background = normalizeBackground(backgroundArg, theme);
  var result;

  if (background) {
    if (typeof background === 'object') {
      var color = background.color,
          dark = background.dark,
          opacity = background.opacity;

      if (typeof dark === 'boolean') {
        result = dark;
      } else if (color && ( // weak opacity means we keep the existing darkness
      !opacity || opacity !== 'weak')) {
        var backgroundColor = (0, _colors.normalizeColor)(background.color, theme);

        if (backgroundColor) {
          result = (0, _colors.colorIsDark)(backgroundColor);
        }
      }
    } else {
      var _color = (0, _colors.normalizeColor)(background, theme);

      if (_color) {
        result = (0, _colors.colorIsDark)(_color);
      }
    }
  }

  return result;
};

exports.backgroundIsDark = backgroundIsDark;

var backgroundStyle = function backgroundStyle(backgroundArg, theme, textColorArg) {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) {
    return undefined;
  } // If the background has a light or dark object, use that


  var background = normalizeBackground(backgroundArg, theme);
  var textColor = textColorArg || theme.global.colors.text;

  if (typeof background === 'object') {
    var styles = [];

    if (background.image) {
      var color;

      if (background.dark === false) {
        color = (0, _colors.normalizeColor)(textColor.light || textColor, theme);
      } else if (background.dark) {
        color = (0, _colors.normalizeColor)(textColor.dark || textColor, theme);
      } else if (!textColorArg) {
        color = 'inherit';
      }

      styles.push((0, _styledComponents.css)(["background-image:", ";background-repeat:", ";background-position:", ";background-size:", ";color:", ";"], background.image, background.repeat || 'no-repeat', background.position || 'center center', background.size || 'cover', color));
    }

    if (background.color) {
      var _color2 = (0, _colors.normalizeColor)(background.color, theme, background.dark);

      var backgroundColor = (0, _colors.getRGBA)(_color2, background.opacity === true ? theme.global.opacity.medium : theme.global.opacity[background.opacity] || background.opacity) || _color2;

      styles.push((0, _styledComponents.css)(["background-color:", ";", ""], backgroundColor, (!background.opacity || background.opacity !== 'weak') && "color: " + (0, _colors.normalizeColor)(textColor[background.dark || (0, _colors.colorIsDark)(backgroundColor) ? 'dark' : 'light'] || textColor, theme) + ";"));
    }

    if (background.dark === false) {
      styles.push((0, _styledComponents.css)(["color:", ";"], textColor.light || textColor));
    } else if (background.dark) {
      styles.push((0, _styledComponents.css)(["color:", ";"], textColor.dark || textColor));
    }

    return styles;
  }

  if (background) {
    if (background.lastIndexOf('url', 0) === 0) {
      return (0, _styledComponents.css)(["background:", " no-repeat center center;background-size:cover;"], background);
    }

    var _backgroundColor = (0, _colors.normalizeColor)(background, theme);

    if (_backgroundColor) {
      var backgroundDark = (0, _colors.colorIsDark)(_backgroundColor);
      return (0, _styledComponents.css)(["background:", ";color:", ";"], _backgroundColor, (0, _colors.normalizeColor)(textColor[backgroundDark || backgroundDark === undefined && theme.dark ? 'dark' : 'light'] || textColor, theme));
    }
  }

  return undefined;
};

exports.backgroundStyle = backgroundStyle;
var activeStyle = (0, _styledComponents.css)(["", ""], function (props) {
  return backgroundStyle((0, _colors.normalizeColor)(props.theme.global.active.background, props.theme), props.theme, props.theme.global.active.color);
});
exports.activeStyle = activeStyle;
var selectedStyle = (0, _styledComponents.css)(["", ""], function (props) {
  return backgroundStyle((0, _colors.normalizeColor)(props.theme.global.selected.background, props.theme), props.theme, props.theme.global.selected.color);
});
exports.selectedStyle = selectedStyle;

var getHoverIndicatorStyle = function getHoverIndicatorStyle(hoverIndicator, theme) {
  var background;

  if (hoverIndicator === true || hoverIndicator === 'background') {
    background = theme.global.hover.background;
  } else {
    background = hoverIndicator;
  }

  return (0, _styledComponents.css)(["", ""], backgroundStyle(background, theme, theme.global.hover.color));
};

exports.getHoverIndicatorStyle = getHoverIndicatorStyle;