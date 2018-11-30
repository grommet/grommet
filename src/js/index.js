import { defaultProps } from './default-props';

export * from './components';
export * from './contexts';
export * from './themes';

let initialized = false;
export const initializeDefaults = props => {
  if (initialized) {
    console.warn(
      '[grommet]: default theme has been previously initialized. Make sure to only intialize the default theme once.',
    );
  }
  Object.keys(props).forEach(key => (defaultProps[key] = props[key])); // eslint-disable-line no-return-assign
  initialized = true;
};
