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
      family: `
         Roboto,
         Oxygen,
         Ubuntu,
         Cantarell,
         "Fira Sans",
         "Droid Sans",
         "Helvetica Neue",
         Arial, sans-serif,
         "Apple Color Emoji",
         "Segoe UI Emoji",
         "Segoe UI Symbol"`,
    },
  },
  button: {
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'}
    `,
  },
});
