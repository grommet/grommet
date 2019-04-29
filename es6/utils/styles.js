import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle, parseMetricToNum } from './mixins';
export var baseStyle = css(["font-family:", ";font-size:", ";line-height:", ";font-weight:", ";", " box-sizing:border-box;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;"], function (props) {
  return props.theme.global.font.family;
}, function (props) {
  return props.theme.global.font.size;
}, function (props) {
  return props.theme.global.font.height;
}, function (props) {
  return props.theme.global.font.weight;
}, function (props) {
  return !props.plain && props.theme.global.colors.background && css(["background:", ";color:", ";"], normalizeColor('background', props.theme, true), normalizeColor('text', props.theme, true));
});
export var controlBorderStyle = css(["border:", " solid ", ";border-radius:", ";"], function (props) {
  return props.theme.global.control.border.width;
}, function (props) {
  return normalizeColor(props.theme.global.control.border.color || 'border', props.theme);
}, function (props) {
  return props.theme.global.control.border.radius;
});
export var edgeStyle = function edgeStyle(kind, data, responsive, responsiveBreakpoint, theme) {
  var breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return css(["", ":", ";", ";"], kind, theme.global.edgeSize[data] || data, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[data] || data) + ";\n      ") : '');
  }

  var result = [];

  if (data.horizontal) {
    result.push(css(["", "-left:", ";", "-right:", ";", ";"], kind, theme.global.edgeSize[data.horizontal] || data.horizontal, kind, theme.global.edgeSize[data.horizontal] || data.horizontal, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-left: " + (breakpoint.edgeSize[data.horizontal] || data.horizontal) + ";\n        " + kind + "-right: " + (breakpoint.edgeSize[data.horizontal] || data.horizontal) + ";\n      ") : ''));
  }

  if (data.vertical) {
    result.push(css(["", "-top:", ";", "-bottom:", ";", ";"], kind, theme.global.edgeSize[data.vertical] || data.vertical, kind, theme.global.edgeSize[data.vertical] || data.vertical, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-top: " + (breakpoint.edgeSize[data.vertical] || data.vertical) + ";\n        " + kind + "-bottom: " + (breakpoint.edgeSize[data.vertical] || data.vertical) + ";\n      ") : ''));
  }

  if (data.top) {
    result.push(css(["", "-top:", ";", ";"], kind, theme.global.edgeSize[data.top] || data.top, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-top: " + (breakpoint.edgeSize[data.top] || data.top) + ";\n      ") : ''));
  }

  if (data.bottom) {
    result.push(css(["", "-bottom:", ";", ";"], kind, theme.global.edgeSize[data.bottom] || data.bottom, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-bottom: " + (breakpoint.edgeSize[data.bottom] || data.bottom) + ";\n      ") : ''));
  }

  if (data.left) {
    result.push(css(["", "-left:", ";", ";"], kind, theme.global.edgeSize[data.left] || data.left, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-left: " + (breakpoint.edgeSize[data.left] || data.left) + ";\n      ") : ''));
  }

  if (data.right) {
    result.push(css(["", "-right:", ";", ";"], kind, theme.global.edgeSize[data.right] || data.right, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-right: " + (breakpoint.edgeSize[data.right] || data.right) + ";\n      ") : ''));
  }

  return result;
}; // focus also supports clickable elements inside svg

export var focusStyle = css(["> circle,> ellipse,> line,> path,> polygon,> polyline,> rect{outline:", " solid 2px;}border-color:", ";box-shadow:0 0 2px 2px ", ";::-moz-focus-inner{border:0;}"], function (props) {
  return normalizeColor(props.theme.global.focus.border.color, props.theme);
}, function (props) {
  return normalizeColor(props.theme.global.focus.border.color, props.theme);
}, function (props) {
  return normalizeColor(props.theme.global.focus.border.color, props.theme);
});
export var inputStyle = css(["box-sizing:border-box;font-size:inherit;font-family:inherit;border:none;-webkit-appearance:none;padding:", "px;outline:none;background:transparent;color:inherit;", " margin:0;", " ", "::-webkit-search-decoration{-webkit-appearance:none;}"], function (props) {
  return parseMetricToNum(props.theme.global.input.padding) - parseMetricToNum(props.theme.global.control.border.width);
}, function (props) {
  return props.theme.global.input.weight && css(["font-weight:", ";"], props.theme.global.input.weight);
}, function (props) {
  return props.focus && (!props.plain || props.focusIndicator) && focusStyle;
}, controlBorderStyle);
export var overflowStyle = function overflowStyle(overflowProp) {
  if (typeof overflowProp === 'string') {
    return css(["overflow:", ";"], overflowProp);
  }

  return css(["", " ", ";"], overflowProp.horizontal && "overflow-x: " + overflowProp.horizontal + ";", overflowProp.vertical && "overflow-y: " + overflowProp.vertical + ";");
};
var placeholderColor = css(["color:", ";"], function (props) {
  return props.theme.global.colors.placeholder;
});
export var placeholderStyle = css(["&::-webkit-input-placeholder{", ";}&::-moz-placeholder{", ";}&:-ms-input-placeholder{", ";}"], placeholderColor, placeholderColor, placeholderColor); // evalStyle() converts a styled-components item into a string

export var evalStyle = function evalStyle(arg, theme) {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({
      theme: theme
    });
  }

  return arg;
};
var ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
export var genericStyles = css(["", " ", " ", ""], function (props) {
  return props.alignSelf && "align-self: " + ALIGN_SELF_MAP[props.alignSelf] + ";";
}, function (props) {
  return props.gridArea && "grid-area: " + props.gridArea + ";";
}, function (props) {
  return props.margin && edgeStyle('margin', props.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
});
export var disabledStyle = function disabledStyle(componentStyle) {
  return css(["opacity:", ";cursor:default;"], function (props) {
    return componentStyle || props.theme.global.control.disabled.opacity;
  });
};