import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from 'grommet-icons';
import { Box, Button, grommet, Grommet, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  button: {
    simple: {
      color: '#ff9999',
      border: {
        color: '#b9dff0',
      },
      hover: {
        color: 'black',
        border: {
          color: 'magenta',
        },
      },
      active: {
        border: {
          color: 'orange',
        },
        color: 'skyblue',
      },
      disabled: {
        border: {
          color: '#CCC',
        },
        color: '#CCC',
        extend: `background: white;`,
      },
      padding: {
        vertical: '25px',
        horizontal: 'medium',
      },
    },
  },
});

const Simple = () => (
  <>
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Simple Buttons</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} simple />
            <Button icon={<User />} label="Simple" simple />
            <Button icon={<User />} label="Active" simple active />
            <Button icon={<User />} label="Disabled" simple disabled />
            <Button icon={<User />} label="Plain" simple plain />
          </Box>
        </Box>
      </Box>
    </Grommet>
    <Grommet theme={customTheme}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Simple with Custom Theme</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} simple />
            <Button icon={<User />} label="Users" simple />
            <Button icon={<User />} label="Active" simple active />
            <Button icon={<User />} label="Disabled" simple disabled />
            <Button icon={<User />} label="Plain" simple plain />
          </Box>
        </Box>
        <Box gap="small">
          <Text>
            Note: `primary` overrides `simple`. It is not recommended to use
            these props together.
          </Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} label="Users" simple primary />
          </Box>
        </Box>
      </Box>
    </Grommet>
  </>
);

storiesOf('Button', module).add('Simple', () => <Simple />);
