import styled from 'styled-components';
export var getBreakpoint = function getBreakpoint(viewportWidth, theme) {
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
export var getDeviceBreakpoint = function getDeviceBreakpoint(type, theme) {
  return theme.global.deviceBreakpoints[type];
};
export var getBreakpointStyle = function getBreakpointStyle(theme, breakpointSize) {
  var breakpoint = breakpointSize && theme.global.breakpoints[breakpointSize] || {};
  if (!breakpoint.edgeSize) breakpoint.edgeSize = theme.global.edgeSize;
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  if (!breakpoint.radius) breakpoint.radius = theme.global.radius;
  if (!breakpoint.size) breakpoint.size = theme.global.size;
  return breakpoint;
};

// for checks that look for a small screen size, flag for xsmall
// as well since we use xsmall in the hpe theme
export var isSmall = function isSmall(size) {
  return ['xsmall', 'small'].includes(size);
};
export var deviceResponsive = function deviceResponsive(userAgent, theme) {
  // log('--deviceResponsive', userAgent, theme);
  /*
   * Regexes provided for mobile and tablet detection are meant to replace
   * a full-featured specific library due to contributing a considerable size
   * into the bundle.
   *
   * User agents found https://deviceatlas.com/blog/list-of-user-agent-strings
   */
  if (userAgent) {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
      return getDeviceBreakpoint('tablet', theme);
    }
    if (/Mobile|iPhone|Android/.test(userAgent)) {
      return getDeviceBreakpoint('phone', theme);
    }
    return getDeviceBreakpoint('computer', theme);
  }
  return undefined;
};
export var supportsContainerQueries = function supportsContainerQueries() {
  // styled-components v6 and later do not have a withComponent
  // method. We need v6 or later to support container queries.
  var comp = styled.div.withConfig({
    displayName: "responsive__comp",
    componentId: "sc-336m7y-0"
  })(["display:flex;"]);
  var isPreV6 = typeof comp.withComponent === 'function';
  return !isPreV6;
};