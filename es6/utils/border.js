import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle } from './mixins';
export var responsiveBorderStyle = function responsiveBorderStyle(data, theme) {
  var color = normalizeColor(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  var value = breakpoint && (breakpoint.borderSize[borderSize] || borderSize) && style + " " + (breakpoint.borderSize[borderSize] || borderSize) + " " + color;
  if (!value) return undefined;
  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') return "border-" + side + ": " + value + ";";
  if (side === 'end' || side === 'start') return "border-inline-" + side + ": " + value + ";";
  if (side === 'vertical') return "\n      border-left: " + value + ";\n      border-right: " + value + ";\n    ";
  if (side === 'horizontal') return "\n      border-top: " + value + ";\n      border-bottom: " + value + ";\n    ";
  if (side === 'between') return undefined; // no-op

  return "border: " + value + ";";
};
export var borderStyle = function borderStyle(data, responsive, theme) {
  var styles = [];
  var color = normalizeColor(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var value = style + " " + (theme.global.borderSize[borderSize] || borderSize) + " " + color;
  var responsiveStyle = responsive && responsiveBorderStyle(data, theme);
  var breakpoint = responsiveStyle && theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];

  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    styles.push("border-" + side + ": " + value + ";");

    if (responsiveStyle) {
      styles.push(breakpointStyle(breakpoint, responsiveStyle));
    }
  } else if (side === 'end' || side === 'start') {
    styles.push(css(["border-inline-", ":", ";"], side, value));

    if (responsiveStyle) {
      styles.push(breakpointStyle(breakpoint, responsiveStyle));
    }
  } else if (side === 'vertical') {
    styles.push(css(["border-left:", ";border-right:", ";"], value, value));

    if (responsiveStyle) {
      styles.push(breakpointStyle(breakpoint, responsiveStyle));
    }
  } else if (side === 'horizontal') {
    styles.push(css(["border-top:", ";border-bottom:", ";"], value, value));

    if (responsiveStyle) {
      styles.push(breakpointStyle(breakpoint, responsiveStyle));
    }
  } else if (side === 'between') {// no-op
  } else {
    styles.push(css(["border:", ";"], value));

    if (responsiveStyle) {
      styles.push(breakpointStyle(breakpoint, responsiveStyle));
    }
  }

  return styles;
};