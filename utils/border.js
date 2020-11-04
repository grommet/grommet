"use strict";

exports.__esModule = true;
exports.borderStyle = exports.responsiveBorderStyle = void 0;

var _styledComponents = require("styled-components");

var _colors = require("./colors");

var _mixins = require("./mixins");

var responsiveBorderStyle = function responsiveBorderStyle(data, theme) {
  var color = (0, _colors.normalizeColor)(data.color || 'border', theme);
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

exports.responsiveBorderStyle = responsiveBorderStyle;

var borderStyle = function borderStyle(data, responsive, theme) {
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
  } else if (side === 'between') {// no-op
  } else {
    styles.push((0, _styledComponents.css)(["border:", ";"], value));

    if (responsiveStyle) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, responsiveStyle));
    }
  }

  return styles;
};

exports.borderStyle = borderStyle;