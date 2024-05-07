import { deepMerge } from './utils';
import { base } from './themes/base';

export const defaultProps = {
  theme: base,
};

export const extendDefaultTheme = theme => {
  defaultProps.theme = deepMerge(base, theme);
};

export const getDefaultProps = props => ({
  ...defaultProps,
  ...props,
  theme: {
    ...defaultProps.theme,
    ...props.theme,
  },
});
