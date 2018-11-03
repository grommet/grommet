import { css } from 'styled-components';

import { deepFreeze } from '../utils';

export const grommet = deepFreeze({
  global: {
    colors: {
      background: '#ffffff',
    },
    font: {
      family:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",  "Helvetica Neue", Arial, sans-serif,  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      size: '18px',
      height: '24px',
    },
  },
  anchor: {
    color: {
      dark: '#FD6FFF',
      light: '#9060EB',
    },
  },
  button: {
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'};
    `,
  },
});
