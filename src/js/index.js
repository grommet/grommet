import { defaultProps } from './default-props';
import { deepMerge } from './utils';
import { base } from './themes';

export * from './components';
export * from './contexts';
export * from './default-props';
export * from './themes';

/* eslint-disable no-return-assign */
export const extendDefaultTheme = theme =>
  (defaultProps.theme = deepMerge(base, theme));
/* eslint-enable no-return-assign */
