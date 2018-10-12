import { css } from 'styled-components';

import { deepFreeze } from '../utils';

const workSansPath = 'https://fonts.gstatic.com/s/worksans/v2';
const zillaSlabPath = 'https://fonts.gstatic.com/s/zillaslab/v3';

export const grommet = deepFreeze({
  global: {
    font: {
      family: "'Work Sans', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 400;
          src:
            local('Work Sans'),
            local('WorkSans-Regular'),
            url("${workSansPath}/ElUAY9q6T0Ayx4zWzW63VJBw1xU1rKptJj_0jans920.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 600;
          src:
            local('Work Sans SemiBold'),
            local('WorkSans-SemiBold'),
            url("${workSansPath}/z9rX03Xuz9ZNHTMg1_ghGRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Zilla Slab';
          font-style: normal;
          font-weight: 400;
          src:
            local('Zilla Slab Regular'),
            local('ZillaSlab-Regular'),
            url("${zillaSlabPath}/dFa6ZfeM_74wlPZtksIFajo6_V6LVlA.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Zilla Slab';
          font-style: normal;
          font-weight: 600;
          src:
            local('Zilla Slab SemiBold'),
            local('ZillaSlab-SemiBold'),
            url("${zillaSlabPath}/dFa5ZfeM_74wlPZtksIFYuUe6HOpW3pwfa0.woff2") format('woff2');
        }
      `,
    },
  },
  anchor: {
    textDecoration: 'underline',
    color: {
      dark: '#9060EB',
      light: '#9060EB',
    },
  },
  button: {
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'}
    `,
  },
  checkBox: {
    icon: {
      extend: css`
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        width: ${props => props.theme.checkBox.size};
        height: ${props => props.theme.checkBox.size};
      `,
    },
  },
  heading: {
    font: {
      family: "'Zilla Slab', 'Work Sans', Arial, sans-serif",
    },
  },
});
