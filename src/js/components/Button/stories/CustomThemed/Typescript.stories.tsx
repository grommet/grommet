import React from 'react';

import { ThemeType } from 'grommet/themes';
import { Box, Button, Grommet } from 'grommet';

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
      color: '#0743a3',
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
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">
        <Button label="custom theme" onClick={() => {}} primary />
      </Box>
    </Grommet>
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">
        <Button label="custom theme disabled" disabled primary />
      </Box>
    </Grommet>
    <Box align="center" pad="large">
      <Button as="span" label="Custom as=span" />
    </Box>
    <Box align="center" pad="large">
      <Button
        rel="noopener"
        target="_blank"
        href="https://v2.grommet.io/button"
        label="Link to Button docs"
      />
    </Box>
  </>
);
TSCustom.storyName = 'TS-Custom';

export default {
  title: 'Controls/Button/Custom Themed/TS-Custom',
};
