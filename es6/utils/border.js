import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle } from './mixins';
export var borderStyle = function borderStyle(data, responsive, theme) {
  var styles = [];
  var color = normalizeColor(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var value = style + " " + (theme.global.borderSize[borderSize] || borderSize) + " " + color;
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  var responsiveValue = responsive && breakpoint && (breakpoint.borderSize[borderSize] || borderSize) && style + " " + (breakpoint.borderSize[borderSize] || borderSize) + " " + color;

  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    styles.push("border-" + side + ": " + value + ";");

    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, "\n        border-" + side + ": " + responsiveValue + ";\n      "));
    }
  } else if (side === 'end' || side === 'start') {
    styles.push(css(["border-inline-", ":", ";"], side, value));

    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, "\n        border-inline-" + side + ": " + responsiveValue + ";\n      "));
    }
  } else if (side === 'vertical') {
    styles.push(css(["border-left:", ";border-right:", ";"], value, value));

    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, "\n        border-left: " + responsiveValue + ";\n        border-right: " + responsiveValue + ";\n      "));
    }
  } else if (side === 'horizontal') {
    styles.push(css(["border-top:", ";border-bottom:", ";"], value, value));

    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, "\n        border-top: " + responsiveValue + ";\n        border-bottom: " + responsiveValue + ";\n      "));
    }
  } else if (side === 'between') {// no-op
  } else {
    styles.push(css(["border:", ";"], value));

    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, "border: " + responsiveValue + ";"));
    }
  }

  return styles;
};