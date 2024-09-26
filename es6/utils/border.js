import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle } from './mixins';
export var responsiveBorderStyle = function responsiveBorderStyle(data, theme) {
  var color = normalizeColor(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var styles = [];
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  var value = breakpoint && (breakpoint.borderSize[borderSize] || borderSize) && style + " " + (breakpoint.borderSize[borderSize] || borderSize) + " " + color;
  if (!value) return undefined;
  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    styles.push("border-" + side + ": " + value + ";");
  } else if (side === 'end' || side === 'start') {
    styles.push("border-inline-" + side + ": " + value + ";");
  } else if (side === 'vertical') {
    styles.push("\n      border-left: " + value + ";\n      border-right: " + value + ";\n    ");
  } else if (side === 'horizontal') {
    styles.push("\n      border-top: " + value + ";\n      border-bottom: " + value + ";\n    ");
  } else if (side !== 'between') {
    styles.push("border: " + value + ";");
  }
  if (data.image) {
    if (typeof data.image === 'object') {
      var _data$image = data.image,
        slice = _data$image.slice,
        source = _data$image.source;
      if (source) {
        styles.push("border-image-source: " + source + ";");
      }
      if (slice) {
        styles.push("border-image-slice: " + slice + ";");
      }
    }
  }
  return styles.join('\n');
};
export var borderStyle = function borderStyle(borderData, responsive, theme) {
  var borderStyles = [];
  (Array.isArray(borderData) ? borderData : [borderData]).forEach(function (data) {
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
    } else if (side === 'between') {
      // no-op
    } else {
      styles.push(css(["border:", ";"], value));
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    }
    if (data.image) {
      if (typeof data.image === 'object') {
        var _data$image2 = data.image,
          slice = _data$image2.slice,
          source = _data$image2.source;
        if (source) {
          styles.push("border-image-source: " + source + ";");
        }
        if (slice) {
          styles.push("border-image-slice: " + slice + ";");
        }
      }
    }
    borderStyles.push(styles);
  });
  return borderStyles;
};