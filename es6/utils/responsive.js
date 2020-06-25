export var getBreakpoint = function getBreakpoint(windowWidth, theme) {
  var result;
  var sortedBreakpoints = Object.keys(theme.global.breakpoints).sort(function (a, b) {
    var first = theme.global.breakpoints[a];
    var second = theme.global.breakpoints[b];
    if (!first) return 1;
    if (!second) return -1;
    if (!first.value) return 1;
    if (!second.value) return -1;
    return first.value - second.value;
  }); // the last breakpoint on the sorted array should have
  // no windowWidth boundaries

  var lastBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
  sortedBreakpoints.some(function (name) {
    var breakpoint = theme.global.breakpoints[name];

    if (breakpoint) {
      if (!breakpoint.value || breakpoint.value >= windowWidth) {
        result = name;
        return true;
      }
    }

    return false;
  });
  return result || lastBreakpoint;
};
export var getDeviceBreakpoint = function getDeviceBreakpoint(type, theme) {
  return theme.global.deviceBreakpoints[type];
};