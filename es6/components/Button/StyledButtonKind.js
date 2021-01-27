import styled, { css } from 'styled-components';
import { activeStyle, disabledStyle, focusStyle, genericStyles, kindPartStyles, parseMetricToNum } from '../../utils';
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

var padFromTheme = function padFromTheme(size, theme) {
  if (size && theme.button.size && theme.button.size[size] && theme.button.size[size].pad) {
    return {
      vertical: theme.button.size[size].pad.vertical,
      horizontal: theme.button.size[size].pad.horizontal
    };
  }

  if (theme.button.padding) {
    return {
      vertical: theme.global.edgeSize[theme.button.padding.vertical] || theme.button.padding.vertical,
      horizontal: theme.global.edgeSize[theme.button.padding.horizontal] || theme.button.padding.horizontal
    };
  }

  return undefined;
};

var padStyle = function padStyle(_ref) {
  var size = _ref.sizeProp,
      theme = _ref.theme;
  var pad = padFromTheme(size, theme);
  return pad ? css(["padding:", " ", ";"], pad.vertical, pad.horizontal) : '';
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var basicStyle = function basicStyle(props) {
  return css(["border:none;", ";", " ", " > svg{vertical-align:bottom;}"], radiusStyle(props), padStyle(props), fontStyle(props));
};

var getPath = function getPath(theme, path) {
  var obj;

  if (path) {
    obj = theme;
    var parts = path.split('.');

    while (obj && parts.length) {
      obj = obj[parts.shift()];
    }
  }

  return obj;
};

var adjustPadStyle = function adjustPadStyle(pad, width) {
  var offset = parseMetricToNum(width);
  return css(["padding:", "px ", "px;"], parseMetricToNum(pad.vertical) - offset, parseMetricToNum(pad.horizontal) - offset);
}; // build up CSS from basic to specific based on the supplied sub-object paths


var kindStyle = function kindStyle(_ref2) {
  var colorValue = _ref2.colorValue,
      size = _ref2.sizeProp,
      themePaths = _ref2.themePaths,
      theme = _ref2.theme;
  var styles = [];
  var pad = padFromTheme(size, theme);
  themePaths.base.forEach(function (themePath) {
    var obj = getPath(theme, "button." + themePath);

    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));

      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the kind's border width. But don't override any
        // padding in the kind itself for backward compatibility
        styles.push(adjustPadStyle(pad, obj.border.width));
      }
    }
  });
  themePaths.hover.forEach(function (themePath) {
    var obj = getPath(theme, "button." + themePath);

    if (obj) {
      var partStyles = kindPartStyles(obj, theme);
      var adjPadStyles = '';

      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the hover's border width. But don't override any
        // padding in the hover or hover.kind itself for backward compatibility
        adjPadStyles = adjustPadStyle(pad, obj.border.width);
      }

      if (partStyles.length > 0) {
        styles.push(css(["&:hover{", " ", "}"], partStyles, adjPadStyles));
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

var StyledButtonKind = styled.button.attrs(function () {
  return {
    // don't let kind attribute leak to DOM
    kind: undefined
  };
}).withConfig({
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
  return !props.disabled && props.hoverIndicator && hoverIndicatorStyle(props);
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