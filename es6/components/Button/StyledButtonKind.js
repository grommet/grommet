import styled, { css } from 'styled-components';
import { activeStyle, backgroundStyle, disabledStyle, focusStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

var radiusStyle = function radiusStyle(props) {
  var size = props.sizeProp;
  if (size && props.theme.button.size && props.theme.button.size[size]) return css(["border-radius:", ";"], props.theme.button.size[size].border.radius);
  if (props.theme.button.border && props.theme.button.border.radius) return css(["border-radius:", ";"], props.theme.button.border.radius);
  return '';
};

var fontStyle = function fontStyle(props) {
  var size = props.sizeProp || 'medium';
  var data = props.theme.text[size];
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var padStyle = function padStyle(_ref) {
  var size = _ref.sizeProp,
      theme = _ref.theme;

  if (size && theme.button.size && theme.button.size[size] && theme.button.size[size].pad) {
    return css(["padding:", " ", ";"], theme.button.size[size].pad.vertical, theme.button.size[size].pad.horizontal);
  }

  if (theme.button.padding) {
    return css(["padding:", " ", ";"], theme.global.edgeSize[theme.button.padding.vertical] || theme.button.padding.vertical, theme.global.edgeSize[theme.button.padding.horizontal] || theme.button.padding.horizontal);
  }

  return '';
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var basicStyle = function basicStyle(props) {
  return css(["border:none;", ";", " ", " > svg{vertical-align:bottom;}"], radiusStyle(props), padStyle(props), fontStyle(props));
}; // CSS for this sub-object in the theme


var kindPartStyles = function kindPartStyles(obj, theme, colorValue) {
  var styles = [];

  if (obj.padding) {
    if (obj.padding.vertical || obj.padding.horizontal) styles.push("padding: " + (theme.global.edgeSize[obj.padding.vertical] || obj.padding.vertical || 0) + " " + (theme.global.edgeSize[obj.padding.horizontal] || obj.padding.horizontal || 0) + ";");else styles.push("padding: " + (theme.global.edgeSize[obj.padding] || obj.padding || 0) + ";");
  }

  if (obj.background) styles.push(backgroundStyle(colorValue || obj.background, theme, obj.color || (Object.prototype.hasOwnProperty.call(obj, 'color') && obj.color === undefined ? false : undefined)));else if (obj.color) styles.push("color: " + normalizeColor(obj.color, theme) + ";");

  if (obj.border) {
    if (obj.border.width) styles.push(css(["border-style:solid;border-width:", ";"], obj.border.width));
    if (obj.border.color) styles.push(css(["border-color:", ";"], normalizeColor(!obj.background && colorValue || obj.border.color || 'border', theme)));
    if (obj.border.radius) styles.push(css(["border-radius:", ";"], obj.border.radius));
  } else if (obj.border === false) styles.push('border: none;');

  if (colorValue && !obj.border && !obj.background) styles.push("color: " + normalizeColor(colorValue, theme) + ";");

  if (obj.font) {
    if (obj.font.size) {
      styles.push("font-size: " + (theme.text[obj.font.size].size || obj.font.size) + ";");
    }

    if (obj.font.height) {
      styles.push("line-height: " + obj.font.height + ";");
    }

    if (obj.font.weight) {
      styles.push("font-weight: " + obj.font.weight + ";");
    }
  }

  if (obj.opacity) {
    var opacity = obj.opacity === true ? theme.global.opacity.medium : theme.global.opacity[obj.opacity] || obj.opacity;
    styles.push("opacity: " + opacity + ";");
  }

  if (obj.extend) styles.push(obj.extend);
  return styles;
}; // build up CSS from basic to specific based on the supplied sub-object paths


var kindStyle = function kindStyle(_ref2) {
  var colorValue = _ref2.colorValue,
      themePaths = _ref2.themePaths,
      theme = _ref2.theme;
  var styles = [];
  themePaths.base.forEach(function (themePath) {
    var obj = theme.button;

    if (themePath) {
      var parts = themePath.split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }
    }

    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
    }
  });
  themePaths.hover.forEach(function (themePath) {
    var obj = theme.button;

    if (themePath) {
      var parts = themePath.split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }

      if (obj) {
        var partStyles = kindPartStyles(obj, theme);
        if (partStyles.length > 0) styles.push(css(["&:hover{", "}"], partStyles));
      }
    }
  });
  return styles;
};

var hoverIndicatorStyle = function hoverIndicatorStyle(_ref3) {
  var hoverIndicator = _ref3.hoverIndicator,
      theme = _ref3.theme;
  var themishObj = {};
  if (hoverIndicator === true || hoverIndicator === 'background') themishObj.background = theme.global.hover.background;else themishObj.background = hoverIndicator;
  var styles = kindPartStyles(themishObj, theme);
  if (styles.length > 0) return css(["&:hover{", "}"], styles);
  return '';
};

var fillStyle = function fillStyle(fillContainer) {
  if (fillContainer === 'horizontal') {
    return 'width: 100%;';
  }

  if (fillContainer === 'vertical') {
    return 'height: 100%;';
  }

  if (fillContainer) {
    return "\n      width: 100%;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n    ";
  }

  return undefined;
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var plainStyle = function plainStyle() {
  return css(["outline:none;border:none;padding:0;text-align:inherit;color:inherit;> svg{vertical-align:bottom;}"]);
};

var StyledButtonKind = styled.button.withConfig({
  displayName: "StyledButtonKind",
  componentId: "sc-1vhfpnt-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " ", " &:focus{", "}", " ", " ", ""], genericStyles, function (props) {
  return props.plain && plainStyle(props);
}, function (props) {
  return !props.disabled && props.active && activeStyle;
}, function (props) {
  return !props.plain && basicStyle(props);
}, function (props) {
  return !props.plain && kindStyle(props);
}, function (props) {
  return !props.plain && props.align && "\n    text-align: " + props.align + ";\n    ";
}, function (props) {
  return props.hoverIndicator && hoverIndicatorStyle(props);
}, function (props) {
  return props.disabled && disabledStyle(props.theme.button.disabled.opacity);
}, function (props) {
  return (!props.plain || props.focusIndicator) && focusStyle();
}, function (props) {
  return !props.plain && props.theme.button.transition && "\n    transition-property: " + props.theme.button.transition.properties.join(',') + ";\n    transition-duration: " + props.theme.button.transition.duration + "s;\n    transition-timing-function: " + props.theme.button.transition.timing + ";\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.theme.button && props.theme.button.extend;
});
StyledButtonKind.defaultProps = {};
Object.setPrototypeOf(StyledButtonKind.defaultProps, defaultProps);
export { StyledButtonKind };