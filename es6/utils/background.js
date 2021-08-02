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
      } else if (color && (!opacity || opacity !== 'weak')) {
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

var darkContext = function darkContext(backgroundColor) {
  var isDark = colorIsDark(backgroundColor);
  if (isDark === undefined) return undefined;
  return isDark ? 'dark' : 'light';
}; // Returns an array of two CSS colors: [background, color]
// Either could be undefined.
// background could be a CSS gradient, like "linear-gradient(...)"


export var backgroundAndTextColors = function backgroundAndTextColors(backgroundArg, textArg, theme) {
  if (!backgroundArg) return [undefined, textArg];
  var global = theme.global;
  var background = normalizeBackground(backgroundArg, theme);
  var text = textArg || global.colors.text;
  var backgroundColor;
  var textColor;

  if (typeof background === 'object') {
    if (background.dark === false) {
      textColor = text.light || text;
    } else if (background.dark) {
      textColor = text.dark || text;
    }

    if (background.color) {
      var color = normalizeColor(background.color, theme, background.dark);
      var opacity = background.opacity === true ? global.opacity.medium : global.opacity[background.opacity] || background.opacity;
      backgroundColor = getRGBA(color, opacity) || color; // If we don't have a textColor already, and we aren't too translucent,
      // set the textColor to have the best contrast against the background
      // color.

      if (!textColor && (opacity === undefined || opacity > 0.3)) {
        var shade = darkContext(backgroundColor, theme);
        textColor = normalizeColor(shade && text[shade] || text, theme);
      }
    }
  } else {
    backgroundColor = normalizeColor(background, theme);

    var _shade = darkContext(backgroundColor, theme);

    if (_shade) {
      textColor = normalizeColor(text[_shade] || text, theme, _shade === 'dark');
    } else {
      // If we can't determine the shade, we assume this isn't a simple color.
      // It could be a gradient. backgroundStyle() will take care of that case.
      if (backgroundColor !== 'transparent') backgroundColor = undefined;
      if (text) textColor = normalizeColor(text, theme);
    }
  } // if textArg is false, we don't want the textColor, used for Button hover


  if (textArg === false) textColor = undefined;
  return [backgroundColor, textColor];
};
export var backgroundStyle = function backgroundStyle(backgroundArg, theme, textColorArg) {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) return undefined;
  var background = normalizeBackground(backgroundArg, theme);

  if (typeof background === 'string' && background.lastIndexOf('url', 0) === 0) {
    return css(["background:", " no-repeat center center;background-size:cover;"], background);
  }

  var _backgroundAndTextCol = backgroundAndTextColors(background, textColorArg, theme),
      backgroundColor = _backgroundAndTextCol[0],
      textColor = _backgroundAndTextCol[1];

  if (background.image) {
    var backgroundStyles = "\n      " + (backgroundColor ? "background-color: " + backgroundColor + ";" : '') + "\n      background-image: " + background.image + ";\n      background-repeat: " + (background.repeat || 'no-repeat') + ";\n      background-position: " + (background.position || 'center center') + ";\n      background-size: " + (background.size || 'cover') + ";\n    "; // allow both background color and image, in case the image doesn't fill
    // when image and opacity are used together, we need to use pseudo :before
    // to ensure that only image and background color are affected by opacity
    // but not the container contents

    return css(["", " ", ""], textColor ? "color: " + textColor + ";" : '', !background.opacity ? backgroundStyles : "position: relative;\n        z-index: 0;\n        &:before {\n          content: '';\n          position: absolute;\n          top: 0;\n          right: 0;\n          left: 0;\n          bottom: 0;\n          z-index: -1;\n          " + backgroundStyles + "\n          opacity: " + (background.opacity === true ? theme.global.opacity.medium : theme.global.opacity[background.opacity] || background.opacity) + ";\n        }");
  }

  if (backgroundColor) {
    return css(["background-color:", ";", ""], backgroundColor, textColor ? "color: " + textColor + ";" : '');
  }

  if (typeof background === 'string') // This case takes care of gradients
    // or theme colors that use CSS names like 'crimson' that we don't parse
    return css(["background:", ";"], normalizeColor(background, theme));
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
  var elevation;

  if (hoverIndicator === true || hoverIndicator === 'background') {
    background = theme.global.hover.background;
  } else if (typeof hoverIndicator === 'object') {
    if (hoverIndicator.elevation || hoverIndicator.background) {
      elevation = hoverIndicator.elevation;
      background = hoverIndicator.background;
    } else background = hoverIndicator;
  } else {
    background = hoverIndicator;
  }

  return css(["", " ", ""], backgroundStyle(background, theme, theme.global.hover.color), elevation && "box-shadow: " + theme.global.elevation[theme.dark ? 'dark' : 'light'][elevation] + ";");
};