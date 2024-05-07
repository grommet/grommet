import { deepMerge } from './utils';
import { base } from './themes/base';

export const defaultProps = {
  theme: base,
};

export const extendDefaultTheme = theme => {
  defaultProps.theme = deepMerge(base, theme);
};

export const getDefaultProps = props => {
  const result = {...props};
  Object.setPrototypeOf(result, defaultProps);
  return result;
};
