import { css } from 'styled-components';
import { colorIsDark, getRGBA, normalizeColor } from './colors'; // evalStyle() converts a styled-components item into a string

var evalStyle = function evalStyle(arg, theme) {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({
      theme: theme
    });
  }

  return arg;
};

export var normalizeBackground = function normalizeBackground(background, theme) {
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
export var backgroundIsDark = function backgroundIsDark(backgroundArg, theme) {
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
        var backgroundColor = normalizeColor(background.color, theme);

        if (backgroundColor) {
          result = colorIsDark(backgroundColor);
        }
      }
    } else {
      var _color = normalizeColor(background, theme);

      if (_color) {
        result = colorIsDark(_color);
      }
    }
  }

  return result;
};
export var backgroundStyle = function backgroundStyle(backgroundArg, theme, textColorArg) {
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
        color = normalizeColor(textColor.light || textColor, theme);
      } else if (background.dark) {
        color = normalizeColor(textColor.dark || textColor, theme);
      } else if (!textColorArg) {
        color = 'inherit';
      }

      styles.push(css(["background-image:", ";background-repeat:", ";background-position:", ";background-size:", ";color:", ";"], background.image, background.repeat || 'no-repeat', background.position || 'center center', background.size || 'cover', color));
    }

    if (background.color) {
      var _color2 = normalizeColor(background.color, theme, background.dark);

      var backgroundColor = getRGBA(_color2, background.opacity === true ? theme.global.opacity.medium : theme.global.opacity[background.opacity] || background.opacity) || _color2;

      styles.push(css(["background-color:", ";", ""], backgroundColor, (!background.opacity || background.opacity !== 'weak') && "color: " + normalizeColor(textColor[background.dark || colorIsDark(backgroundColor) ? 'dark' : 'light'] || textColor, theme) + ";"));
    }

    if (background.dark === false) {
      styles.push(css(["color:", ";"], textColor.light || textColor));
    } else if (background.dark) {
      styles.push(css(["color:", ";"], textColor.dark || textColor));
    }

    return styles;
  }

  if (background) {
    if (background.lastIndexOf('url', 0) === 0) {
      return css(["background:", " no-repeat center center;background-size:cover;"], background);
    }

    var _backgroundColor = normalizeColor(background, theme);

    if (_backgroundColor) {
      var backgroundDark = colorIsDark(_backgroundColor);
      return css(["background:", ";color:", ";"], _backgroundColor, normalizeColor(textColor[backgroundDark || backgroundDark === undefined && theme.dark ? 'dark' : 'light'] || textColor, theme));
    }
  }

  return undefined;
};
export var activeStyle = css(["", ""], function (props) {
  return backgroundStyle(normalizeColor(props.theme.global.active.background, props.theme), props.theme, props.theme.global.active.color);
});
export var selectedStyle = css(["", ""], function (props) {
  return backgroundStyle(normalizeColor(props.theme.global.selected.background, props.theme), props.theme, props.theme.global.selected.color);
});
export var getHoverIndicatorStyle = function getHoverIndicatorStyle(hoverIndicator, theme) {
  var background;

  if (hoverIndicator === true || hoverIndicator === 'background') {
    background = theme.global.hover.background;
  } else {
    background = hoverIndicator;
  }

  return css(["", ""], backgroundStyle(background, theme, theme.global.hover.color));
};