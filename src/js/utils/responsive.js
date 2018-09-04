export const getBreakpoint = (windowWidth, theme) => Object.keys(theme.global.breakpoints)
  .map(
    size => ({ size, value: theme.global.breakpoints[size] })
  )
  .sort(
    (a, b) => b.value > a.value
  )
  .reduce(
    (size, breakpoint) => (
      (windowWidth <= breakpoint.value) ? breakpoint.size : size
    ),
    'wide'
  );
