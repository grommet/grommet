import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Button, MnetUIBase } from 'mnet-ui-base';

const customTheme = {
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
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    primary: {
      color: '#2196f3',
    },
    extend: props => {
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

const CustomTheme = () => (
  <>
    <MnetUIBase theme={customTheme}>
      <Box align="center" pad="large">
        <Button label="custom theme" onClick={() => {}} primary />
      </Box>
    </MnetUIBase>
    <>
      <Box align="center" pad="large">
        <Button as="span" label="Custom as=span" />
      </Box>
    </>
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Button', module).add('Custom', () => <CustomTheme />);
}
