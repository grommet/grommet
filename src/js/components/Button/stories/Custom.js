import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet } from 'grommet';

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
    disabled: {
      color: 'orange',
      border: {
        color: 'orange',
      },
      primary: {
        background: 'orange',
        color: 'text',
      },
      extend: `border: 10px dashed red;`,
    },
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    active: {
      color: 'purple',
      background: {
        color: '#54FG32',
        opacity: 0.2,
      },
      primary: {
        border: {
          color: 'red',
        },
        extend: `background: cadetblue;`,
      },
    },
    primary: {
      color: 'orange',
      background: {
        color: '#333',
        opacity: 0.2,
      },
      extend: `border: 5px dotted green;`,
    },
    extend: props => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
            text-transform: uppercase;
          `;
      }
      return `
          font-size: 12px;
          font-weight: bold;
          ${extraStyles}
        `;
    },
  },
};

const coloredButton = {
  button: {
    border: {
      color: 'accent-1',
    },
    color: { dark: 'accent-1', light: 'dark-2' },
    primary: {
      color: 'neutral-2',
    },
  },
};

const CustomTheme = () => (
  <>
    <Grommet theme={customTheme}>
      <Box
        align="center"
        justify="center"
        pad="large"
        direction="row"
        gap="small"
      >
        <Button label="custom theme" onClick={() => {}} primary />
        <Button label="custom active" onClick={() => {}} active />
        <Button
          label="custom active primary"
          onClick={() => {}}
          primary
          active
        />
        <Button label="primary disabled" onClick={() => {}} primary disabled />
        <Button label="Disabled" onClick={() => {}} disabled />
        <Button label="Plain Disabled" onClick={() => {}} plain disabled />
      </Box>
    </Grommet>
    <Grommet theme={coloredButton}>
      <Box align="center" pad="large">
        <Button as="span" label="theme on dark background" primary />
      </Box>
    </Grommet>
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Button as="span" label="Custom as=span" />
      </Box>
    </Grommet>
  </>
);

storiesOf('Button', module).add('Custom', () => <CustomTheme />);
