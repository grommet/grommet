import { deepMerge } from './utils';
import { base } from './themes/base';
export var defaultProps = {
  theme: base
};
export var extendDefaultTheme = function extendDefaultTheme(theme) {
  defaultProps.theme = deepMerge(base, theme);
};

/*
  Pass `theme` for component which can be located outside of theme context.
  To be used as argument for `attrs` method from `styled-components`.
 */
export var withTheme = function withTheme(props) {
  return {
    theme: deepMerge(defaultProps.theme, props.theme)
  };
};