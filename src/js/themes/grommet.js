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
    backgrounds: {
      stack: {
        color: 'light-1',
        image: `url(https://v2.grommet.io/img/stak-hurrah.svg)`,
      },
      'gradient-purple-blue': {
        color: 'neutral-3',
        image: `linear-gradient(
          #3D138D 0%, /* neutral-2 */
          #00739D 100% /* neutral-3 */
        );`,
        rotate: 145,
      },
      'gradient-purple-gold': {
        color: 'neutral-2',
        image: `linear-gradient(
          #3D138D 0%, /* neutral-2 */
          #EB0F79 75%,
          #FFCA58 100% /* accent-4 */
        );`,
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
      ${(props) => !props.plain && 'font-weight: bold;'}
    `,
  },
});
