// Copied from Recompose (https://github.com/acdlite/recompose) under MIT license.
// https://github.com/acdlite/recompose#readme
// https://github.com/acdlite/recompose/pull/744

export const compose = (...funcs) =>
  funcs.reduce(
    (a, b) => (...args) => a(b(...args)),
    arg => arg,
  );

export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};
