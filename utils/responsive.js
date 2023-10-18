"use strict";

exports.__esModule = true;
exports.getDeviceBreakpoint = exports.getBreakpointStyle = exports.getBreakpoint = void 0;
var getBreakpoint = exports.getBreakpoint = function getBreakpoint(viewportWidth, theme) {
  var sortedBreakpoints = Object.keys(theme.global.breakpoints).sort(function (a, b) {
    var first = theme.global.breakpoints[a];
    var second = theme.global.breakpoints[b];
    if (!first) return 1;
    if (!second) return -1;
    if (!first.value) return 1;
    if (!second.value) return -1;
    return first.value - second.value;
  });

  // the last breakpoint on the sorted array should have
  // no windowWidth boundaries
  var lastBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
  var result = sortedBreakpoints.find(function (name) {
    var breakpoint = theme.global.breakpoints[name];
    return !breakpoint.value || breakpoint.value >= viewportWidth ? name : false;
  });
  return result || lastBreakpoint;
};
var getDeviceBreakpoint = exports.getDeviceBreakpoint = function getDeviceBreakpoint(type, theme) {
  return theme.global.deviceBreakpoints[type];
};
var getBreakpointStyle = exports.getBreakpointStyle = function getBreakpointStyle(theme, breakpointSize) {
  var breakpoint = breakpointSize && theme.global.breakpoints[breakpointSize] || {};
  if (!breakpoint.edgeSize) breakpoint.edgeSize = theme.global.edgeSize;
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  if (!breakpoint.size) breakpoint.size = theme.global.size;
  return breakpoint;
};