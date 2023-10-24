"use strict";

exports.__esModule = true;
exports.selectedStyle = exports.normalizeBackground = exports.getHoverIndicatorStyle = exports.backgroundStyle = exports.backgroundIsDark = exports.backgroundAndTextColors = exports.activeStyle = void 0;
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
var normalizeBackground = exports.normalizeBackground = function normalizeBackground(backgroundArg, theme) {
  var _theme$global$backgro;
  var background = ((_theme$global$backgro = theme.global.backgrounds) == null ? void 0 : _theme$global$backgro[backgroundArg]) || backgroundArg;
  var result = background;
  // If the background has a light or dark object, use that
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
var normalizeBackgroundColor = function normalizeBackgroundColor(backgroundArg, theme) {
  var _theme$global$backgro2;
  var background = backgroundArg.color || backgroundArg;
  var result = (0, _colors.normalizeColor)(
  // Background color may be defined by theme.global.backgrounds or
  // theme.global.colors.
  ((_theme$global$backgro2 = theme.global.backgrounds) == null ? void 0 : _theme$global$backgro2[background]) || background, theme, backgroundArg.dark);
  return result;
};
var normalizeBackgroundImage = function normalizeBackgroundImage(background, theme) {
  var result;
  if (background.image) {
    var _theme$global$backgro3, _theme$global$backgro4;
    result = normalizeBackground(background.dark ? (_theme$global$backgro3 = theme.global.backgrounds) == null || (_theme$global$backgro3 = _theme$global$backgro3[background.image]) == null ? void 0 : _theme$global$backgro3.dark : (_theme$global$backgro4 = theme.global.backgrounds) == null ? void 0 : _theme$global$backgro4[background.image], theme) || background.image;
  } else {
    var _theme$global$backgro5;
    var normalized = normalizeBackground((_theme$global$backgro5 = theme.global.backgrounds) == null ? void 0 : _theme$global$backgro5[background], theme);
    result = typeof normalized === 'object' ? normalizeBackgroundImage(normalized, theme) : normalized;
  }
  return result;
};
var rotateBackground = function rotateBackground(background, theme) {
  var backgroundImage = normalizeBackgroundImage(background, theme);
  var result = backgroundImage;
  if (backgroundImage.lastIndexOf('linear-gradient', 0) === 0) {
    var regex = /\d{1,}deg\b,/gm; // Contains rotation specified in degrees. Only targets 'deg' string with a trailing comma. Do not match 'deg' string for hsl, etc..
    result = backgroundImage.lastIndexOf('deg,') >= 0 ? backgroundImage.replace(regex, background.rotate + "deg,") : backgroundImage.replace('linear-gradient(', "linear-gradient(" + background.rotate + "deg, ");
  } else {
    console.warn( // eslint-disable-next-line max-len
    "'background.rotate' property only supports 'background.image' containing a linear-gradient string.");
  }
  return result;
};
var backgroundIsDark = exports.backgroundIsDark = function backgroundIsDark(backgroundArg, theme) {
  var background = normalizeBackground(backgroundArg, theme);
  var result;
  if (background) {
    if (typeof background === 'object') {
      var color = background.color,
        dark = background.dark,
        opacity = background.opacity;
      if (typeof dark === 'boolean') {
        result = dark;
      } else if (color && (
      // weak opacity means we keep the existing darkness
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
var darkContext = function darkContext(backgroundColor) {
  var isDark = (0, _colors.colorIsDark)(backgroundColor);
  if (isDark === undefined) return undefined;
  return isDark ? 'dark' : 'light';
};

// Returns an array of two CSS colors: [background, color]
// Either could be undefined.
// background could be a CSS gradient, like "linear-gradient(...)"
var backgroundAndTextColors = exports.backgroundAndTextColors = function backgroundAndTextColors(backgroundArg, textArg, theme) {
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
      var color = normalizeBackgroundColor(background, theme);
      var opacity = background.opacity === true ? global.opacity.medium : global.opacity[background.opacity] || background.opacity;
      backgroundColor = (0, _colors.getRGBA)(color, opacity) || color;

      // If we don't have a textColor already, and we aren't too translucent,
      // set the textColor to have the best contrast against the background
      // color.
      if (!textColor && (opacity === undefined || opacity > 0.3)) {
        var shade = darkContext(backgroundColor, theme);
        textColor = (0, _colors.normalizeColor)(shade && text[shade] || text, theme);
      }
    }
  } else {
    backgroundColor = normalizeBackgroundColor(background, theme);
    var _shade = darkContext(backgroundColor, theme);
    var transparent;
    if (backgroundColor && (0, _colors.canExtractRGBArray)(backgroundColor)) {
      var colorArray = (0, _colors.getRGBArray)(backgroundColor);
      // check if the alpha value is less than 0.5
      if (colorArray[3] < 0.5) transparent = true;
    }
    if (_shade) {
      textColor = (0, _colors.normalizeColor)(text[_shade] || text, theme, _shade === 'dark');
    } else if (transparent && text) {
      textColor = (0, _colors.normalizeColor)(text, theme);
    } else {
      // If we can't determine the shade, we assume this isn't a simple color.
      // It could be a gradient. backgroundStyle() will take care of that case.
      if (backgroundColor !== 'transparent') backgroundColor = undefined;
      if (text) textColor = (0, _colors.normalizeColor)(text, theme);
    }
  }
  // if textArg is false, we don't want the textColor, used for Button hover
  if (textArg === false) textColor = undefined;
  return [backgroundColor, textColor];
};
var backgroundStyle = exports.backgroundStyle = function backgroundStyle(backgroundArg, theme, textColorArg) {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) return undefined;
  var background = normalizeBackground(backgroundArg, theme);
  var _backgroundAndTextCol = backgroundAndTextColors(background, textColorArg, theme),
    backgroundColor = _backgroundAndTextCol[0],
    textColor = _backgroundAndTextCol[1];
  var backgroundImage = background.rotate ? rotateBackground(background, theme) : normalizeBackgroundImage(background, theme);
  var backgroundClipStyle = '';
  if (background.clip) {
    backgroundClipStyle = background.clip === 'text' ? "-webkit-text-fill-color: transparent; \n           -webkit-background-clip: text; \n           background-clip: text;" : "background-clip: " + background.clip + ";";
  }
  if (typeof background === 'string' && background.lastIndexOf('url', 0) === 0) {
    return (0, _styledComponents.css)(["background:", " no-repeat center center;background-size:cover;"], background);
  }
  if (backgroundImage) {
    var backgroundStyles = "\n      " + (backgroundColor ? "background-color: " + backgroundColor + ";" : '') + "\n      background-image: " + backgroundImage + ";\n      background-repeat: " + (typeof background === 'object' && background.repeat || 'no-repeat') + ";\n      background-position: " + (background.position || 'center center') + ";\n      background-size: " + (background.size || 'cover') + ";\n      " + backgroundClipStyle + "\n    ";

    // allow both background color and image, in case the image doesn't fill
    // when image and opacity are used together, we need to use pseudo :before
    // to ensure that only image and background color are affected by opacity
    // but not the container contents
    return (0, _styledComponents.css)(["", " ", ""], textColor ? "color: " + textColor + ";" : '', !background.opacity ? backgroundStyles : "position: relative;\n        z-index: 0;\n        &:before {\n          content: '';\n          position: absolute;\n          top: 0;\n          right: 0;\n          left: 0;\n          bottom: 0;\n          z-index: -1;\n          border-radius: inherit;\n          " + backgroundStyles + "\n          opacity: " + (background.opacity === true ? theme.global.opacity.medium : theme.global.opacity[background.opacity] || background.opacity) + ";\n        }");
  }
  if (backgroundColor) {
    return (0, _styledComponents.css)(["background-color:", ";", ""], backgroundColor, textColor ? "color: " + textColor + ";" : '');
  }
  if (typeof background === 'string')
    // This case takes care of gradients
    // or theme colors that use CSS names like 'crimson' that we don't parse
    return (0, _styledComponents.css)(["background:", ";"], (0, _colors.normalizeColor)(background, theme));
  return undefined;
};
var activeStyle = exports.activeStyle = (0, _styledComponents.css)(["", ""], function (props) {
  return backgroundStyle((0, _colors.normalizeColor)(props.theme.global.active.background, props.theme), props.theme, props.theme.global.active.color);
});
var selectedStyle = exports.selectedStyle = (0, _styledComponents.css)(["", ""], function (props) {
  return backgroundStyle((0, _colors.normalizeColor)(props.theme.global.selected.background, props.theme), props.theme, props.theme.global.selected.color);
});
var getHoverIndicatorStyle = exports.getHoverIndicatorStyle = function getHoverIndicatorStyle(hoverIndicator, theme) {
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
  return (0, _styledComponents.css)(["", " ", ""], backgroundStyle(background, theme, theme.global.hover.color), elevation && "box-shadow: " + theme.global.elevation[theme.dark ? 'dark' : 'light'][elevation] + ";");
};