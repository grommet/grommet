import { defaultProps } from './default-props';

export * from './components';
export * from './contexts';
export * from './themes';

let initialized = false;
export const initializeDefaultTheme = theme => {
  if (initialized) {
    console.warn(
      '[grommet]: default theme has been previously initialized. Make sure to only intialize the default theme once.',
    );
  }
  defaultProps.theme = theme;
  initialized = true;
};
