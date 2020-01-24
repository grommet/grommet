"use strict";

exports.__esModule = true;
exports.borderStyle = void 0;

var _styledComponents = require("styled-components");

var _colors = require("./colors");

var _mixins = require("./mixins");

var borderStyle = function borderStyle(data, responsive, theme) {
  var styles = [];
  var color = (0, _colors.normalizeColor)(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var value = style + " " + (theme.global.borderSize[borderSize] || borderSize) + " " + color;
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  var responsiveValue = responsive && breakpoint && (breakpoint.borderSize[borderSize] || borderSize) && style + " " + (breakpoint.borderSize[borderSize] || borderSize) + " " + color;

  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    styles.push("border-" + side + ": " + value + ";");

    if (responsiveValue) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-" + side + ": " + responsiveValue + ";\n      "));
    }
  } else if (side === 'end' || side === 'start') {
    styles.push((0, _styledComponents.css)(["border-inline-", ":", ";"], side, value));

    if (responsiveValue) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-inline-" + side + ": " + responsiveValue + ";\n      "));
    }
  } else if (side === 'vertical') {
    styles.push((0, _styledComponents.css)(["border-left:", ";border-right:", ";"], value, value));

    if (responsiveValue) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-left: " + responsiveValue + ";\n        border-right: " + responsiveValue + ";\n      "));
    }
  } else if (side === 'horizontal') {
    styles.push((0, _styledComponents.css)(["border-top:", ";border-bottom:", ";"], value, value));

    if (responsiveValue) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-top: " + responsiveValue + ";\n        border-bottom: " + responsiveValue + ";\n      "));
    }
  } else if (side === 'between') {// no-op
  } else {
    styles.push((0, _styledComponents.css)(["border:", ";"], value));

    if (responsiveValue) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "border: " + responsiveValue + ";"));
    }
  }

  return styles;
};

exports.borderStyle = borderStyle;