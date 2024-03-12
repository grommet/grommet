import React from 'react';

import { ThemeType } from 'grommet/themes';
import { Box, Button, Tag, Grommet } from 'grommet';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTheme: ThemeType = {
  global: {
    font: {
      family: 'Arial',
    },
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3',
    },
    disabled: {
      color: '#fe2693',
      opacity: '.2',
      border: {
        color: '#000000',
        width: '10px',
      },
    },
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    primary: {
      color: '#2196f3',
    },
    extend: (props) => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
          text-transform: uppercase;
        `;
      }
      return `
        color: white;
        font-size: 12px;
        font-weight: bold;

        ${extraStyles}
      `;
    },
  },
};

export const TSCustom = () => (
  <>
    <Grommet>
      <Box pad="large" gap="medium" align="start">
        <Tag name="name" value="value" />
        <Tag value="value" />
        <Tag
          name="name that is much longer and may need to wrap"
          value="value"
        />
      </Box>
    </Grommet>
  </>
);
TSCustom.storyName = 'TS-Custom';

export default {
  title: 'Controls/Button/Custom Themed/TS-Custom',
};
