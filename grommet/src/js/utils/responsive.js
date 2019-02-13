export const getBreakpoint = (windowWidth, theme) => {
  let result;
  Object.keys(theme.global.breakpoints)
    .sort((a, b) => {
      const first = theme.global.breakpoints[a];
      const second = theme.global.breakpoints[b];
      if (!first) return 1;
      if (!second) return -1;
      if (!first.value) return 1;
      if (!second.value) return -1;
      return first.value - second.value;
    })
    .some(name => {
      const breakpoint = theme.global.breakpoints[name];
      if (breakpoint) {
        if (!breakpoint.value || breakpoint.value >= windowWidth) {
          result = name;
          return true;
        }
      }
      return false;
    });
  return result;
};

export const getDeviceBreakpoint = (type, theme) =>
  theme.global.deviceBreakpoints[type];
