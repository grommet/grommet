import { css } from 'styled-components';
import { colorIsDark, getRGBA, normalizeColor } from './colors';
import { evalStyle } from './styles';
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
  // If the background has a light or dark object, use that
  var background = normalizeBackground(backgroundArg, theme);
  var textColor = textColorArg || theme.global.colors.text;

  if (typeof background === 'object') {
    var styles = [];

    if (background.image) {
      var color;

      if (background.dark === false) {
        color = textColor.light;
      } else if (background.dark) {
        color = textColor.dark;
      } else if (!textColorArg) {
        color = 'inherit';
      }

      styles.push(css(["background-image:", ";background-repeat:", ";background-position:", ";background-size:", ";color:", ";"], background.image, background.repeat || 'no-repeat', background.position || 'center center', background.size || 'cover', color));
    }

    if (background.color) {
      var _color2 = normalizeColor(background.color, theme);

      var backgroundColor = getRGBA(_color2, background.opacity === true ? theme.global.opacity.medium : theme.global.opacity[background.opacity] || background.opacity) || _color2;

      styles.push(css(["background-color:", ";", ""], backgroundColor, (!background.opacity || background.opacity !== 'weak') && "color: " + textColor[background.dark || colorIsDark(backgroundColor) ? 'dark' : 'light'] + ";"));
    }

    if (background.dark === false) {
      styles.push(css(["color:", ";"], textColor.light));
    } else if (background.dark) {
      styles.push(css(["color:", ";"], textColor.dark));
    }

    return styles;
  }

  if (background) {
    if (background.lastIndexOf('url', 0) === 0) {
      return css(["background:", " no-repeat center center;background-size:cover;"], background);
    }

    var _color3 = normalizeColor(background, theme);

    if (_color3) {
      return css(["background:", ";color:", ";"], _color3, textColor[colorIsDark(_color3) ? 'dark' : 'light']);
    }
  }

  return undefined;
};
export var activeStyle = css(["", " color:", ";"], function (props) {
  return backgroundStyle(normalizeColor(props.theme.global.active.background, props.theme), props.theme);
}, function (props) {
  return normalizeColor(props.theme.global.active.color, props.theme);
});
export var selectedStyle = css(["", " color:", ";"], function (props) {
  return backgroundStyle(normalizeColor(props.theme.global.selected.background, props.theme), props.theme);
}, function (props) {
  return normalizeColor(props.theme.global.selected.color, props.theme);
});