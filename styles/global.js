"use strict";

exports.__esModule = true;
exports.edgeStyle = exports.breakpointStyle = exports.baseStyle = void 0;

var _styledComponents = require("styled-components");

var baseStyle = (0, _styledComponents.css)(["font-family:", ";font-size:", ";line-height:", ";box-sizing:border-box;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;"], function (props) {
  return props.theme.global.font.family;
}, function (props) {
  return props.theme.global.font.size;
}, function (props) {
  return props.theme.global.font.height;
});
exports.baseStyle = baseStyle;

var breakpointStyle = function breakpointStyle(breakpoint, content) {
  return (0, _styledComponents.css)(["@media only screen ", "{", ";}"], breakpoint.value && "and (max-width: " + breakpoint.value + "px)", content);
};

exports.breakpointStyle = breakpointStyle;

var edgeStyle = function edgeStyle(kind, data, responsive, responsiveBreakpoint, theme) {
  var breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return (0, _styledComponents.css)(["", ":", ";", ";"], kind, theme.global.edgeSize[data] || data, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[data] || data) + ";\n      ") : '');
  }

  var result = [];

  if (data.horizontal) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", "-right:", ";", ";"], kind, theme.global.edgeSize[data.horizontal] || data.horizontal, kind, theme.global.edgeSize[data.horizontal] || data.horizontal, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-left: " + (breakpoint.edgeSize[data.horizontal] || data.horizontal) + ";\n        " + kind + "-right: " + (breakpoint.edgeSize[data.horizontal] || data.horizontal) + ";\n      ") : ''));
  }

  if (data.vertical) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", "-bottom:", ";", ";"], kind, theme.global.edgeSize[data.vertical] || data.vertical, kind, theme.global.edgeSize[data.vertical] || data.vertical, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-top: " + (breakpoint.edgeSize[data.vertical] || data.vertical) + ";\n        " + kind + "-bottom: " + (breakpoint.edgeSize[data.vertical] || data.vertical) + ";\n      ") : ''));
  }

  if (data.top) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", ";"], kind, theme.global.edgeSize[data.top] || data.top, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-top: " + (breakpoint.edgeSize[data.top] || data.top) + ";\n      ") : ''));
  }

  if (data.bottom) {
    result.push((0, _styledComponents.css)(["", "-bottom:", ";", ";"], kind, theme.global.edgeSize[data.bottom] || data.bottom, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-bottom: " + (breakpoint.edgeSize[data.bottom] || data.bottom) + ";\n      ") : ''));
  }

  if (data.left) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", ";"], kind, theme.global.edgeSize[data.left] || data.left, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-left: " + (breakpoint.edgeSize[data.left] || data.left) + ";\n      ") : ''));
  }

  if (data.right) {
    result.push((0, _styledComponents.css)(["", "-right:", ";", ";"], kind, theme.global.edgeSize[data.right] || data.right, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + "-right: " + (breakpoint.edgeSize[data.right] || data.right) + ";\n      ") : ''));
  }

  return result;
};

exports.edgeStyle = edgeStyle;