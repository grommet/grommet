import { css } from 'styled-components';

import { deepFreeze } from '../utils/object';

const openSansPath = 'https://fonts.gstatic.com/s/opensans/v17';

export const mnet = deepFreeze({
  global: {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#1f2024',
      },
    },
    font: {
      family: "'Open Sans', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Open Sans';
          src:
            font-display: swap;
            local('Open Sans Regular'),
            local('OpenSans-Regular'),
            url("${openSansPath}//mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2") format('woff2');
            unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
        }
      `,
    },
  },
  button: {
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'}
    `,
  },
});
