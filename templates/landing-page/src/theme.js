import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

export const customTheme = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 400,
      },
    },
  },
  heading: {
    extend: () => `margin-top: 12px; margin-bottom: 12px;`,
  },
  paragraph: {
    extend: () => `font-weight: 300; margin-top: 0;`,
    xxlarge: {
      size: '28px',
    },
  },
  textInput: {
    placeholder: {
      extend: () => `color: #44444`,
    },
  },
});
