import { deepMerge } from './utils';
import { base } from './themes/base';
export var defaultProps = {
  theme: base
};
export var extendDefaultTheme = function extendDefaultTheme(theme) {
  defaultProps.theme = deepMerge(base, theme);
};