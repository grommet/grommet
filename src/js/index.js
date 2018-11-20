import { defaultProps } from './default-props';

export * from './components';
export * from './contexts';
export * from './themes';

export const initializeDefaultTheme = theme => (defaultProps.theme = theme); // eslint-disable-line no-return-assign
