export const getBreakpoint = (windowWidth, theme) => {
  let result;
  Object.keys(theme.global.breakpoints)
  .some((name) => {
    const breakpoint = theme.global.breakpoints[name];
    if ((!breakpoint.min || breakpoint.min <= windowWidth)
      && (!breakpoint.max || breakpoint.max >= windowWidth)) {
      result = name;
      return true;
    }
    return false;
  });
  return result;
};
