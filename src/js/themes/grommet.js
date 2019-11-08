import { css } from 'styled-components';

import { deepFreeze } from '../utils/object';

export const grommet = deepFreeze({
  global: {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#000000',
      },
    },
    font: {
      family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
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
