import { deepMerge } from './utils';
import { base } from './themes/base';

export const defaultProps = {
  theme: base,
};

export const extendDefaultTheme = theme => {
  defaultProps.theme = deepMerge(base, theme);
};

export const getDefaultProps = props => {
  const result = Object.create(defaultProps);
  if (props.theme) {
    result.theme = props.theme;
  }
  return result;
};
