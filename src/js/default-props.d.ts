import { base, ThemeType } from './themes/base';

export namespace defaultProps {
  export { base as theme };
}

export function extendDefaultTheme(theme: ThemeType): void;

export function withTheme(props: Record<string, any>): ThemeType;
