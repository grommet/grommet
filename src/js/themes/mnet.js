import { css } from 'styled-components';

import { deepFreeze } from '../utils/object';

export const mnet = deepFreeze({
  global: {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#000000',
      },
    },
    font: {
      family: 'Open Sans',
    },
  },
  button: {
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'}
    `,
  },
});
