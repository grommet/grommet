import { css } from 'styled-components';

import { deepFreeze } from '../utils';

export const grommet = deepFreeze({
  global: {
    colors: {
      background: '#ffffff',
    },
    font: {
      family: '"San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
