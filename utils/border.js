"use strict";

exports.__esModule = true;
exports.responsiveBorderStyle = exports.borderStyle = void 0;
var _styledComponents = require("styled-components");
var _colors = require("./colors");
var _mixins = require("./mixins");
var responsiveBorderStyle = exports.responsiveBorderStyle = function responsiveBorderStyle(data, theme) {
  var color = (0, _colors.normalizeColor)(data.color || 'border', theme);
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
var borderStyle = exports.borderStyle = function borderStyle(borderData, responsive, theme) {
  var borderStyles = [];
  (Array.isArray(borderData) ? borderData : [borderData]).forEach(function (data) {
    var styles = [];
    var color = (0, _colors.normalizeColor)(data.color || 'border', theme);
    var borderSize = data.size || 'xsmall';
    var style = data.style || 'solid';
    var side = typeof data === 'string' ? data : data.side || 'all';
    var value = style + " " + (theme.global.borderSize[borderSize] || borderSize) + " " + color;
    var responsiveStyle = responsive && responsiveBorderStyle(data, theme);
    var breakpoint = responsiveStyle && theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
    if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
      styles.push("border-" + side + ": " + value + ";");
      if (responsiveStyle) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
      }
    } else if (side === 'end' || side === 'start') {
      styles.push((0, _styledComponents.css)(["border-inline-", ":", ";"], side, value));
      if (responsiveStyle) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
      }
    } else if (side === 'vertical') {
      styles.push((0, _styledComponents.css)(["border-left:", ";border-right:", ";"], value, value));
      if (responsiveStyle) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
      }
    } else if (side === 'horizontal') {
      styles.push((0, _styledComponents.css)(["border-top:", ";border-bottom:", ";"], value, value));
      if (responsiveStyle) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
      }
    } else if (side === 'between') {
      // no-op
    } else {
      styles.push((0, _styledComponents.css)(["border:", ";"], value));
      if (responsiveStyle) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
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