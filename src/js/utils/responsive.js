export const getBreakpoint = (viewportWidth, theme) => {
  const sortedBreakpoints = Object.keys(theme.global.breakpoints).sort(
    (a, b) => {
      const first = theme.global.breakpoints[a];
      const second = theme.global.breakpoints[b];
      if (!first) return 1;
      if (!second) return -1;
      if (!first.value) return 1;
      if (!second.value) return -1;
      return first.value - second.value;
    },
  );

  // the last breakpoint on the sorted array should have
  // no windowWidth boundaries
  const lastBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
  const result = sortedBreakpoints.find(name => {
    const breakpoint = theme.global.breakpoints[name];
    return !breakpoint.value || breakpoint.value >= viewportWidth
      ? name
      : false;
  });

  return result || lastBreakpoint;
};

export const getDeviceBreakpoint = (type, theme) =>
  theme.global.deviceBreakpoints[type];

export const getBreakpointStyle = (theme, breakpointSize) => {
  const breakpoint =
    (breakpointSize && theme.global.breakpoints[breakpointSize]) || {};
  if (!breakpoint.edgeSize) breakpoint.edgeSize = theme.global.edgeSize;
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  if (!breakpoint.size) breakpoint.size = theme.global.size;
  return breakpoint;
};
