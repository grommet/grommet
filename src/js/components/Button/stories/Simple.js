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
        color: '#b9dff0',
        border: {
          color: '#99ccff',
        },
      },
    },
  },
});

const Simple = () => (
  <>
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Default Buttons</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} hoverIndicator />
            <Button icon={<User />} label="Users" />
          </Box>
        </Box>
        <Box gap="small">
          <Text>Simple Buttons</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} simple />
            <Button icon={<User />} label="Users" simple />
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
          </Box>
        </Box>
        <Box gap="small">
          <Text>Simple + Primary: `primary` overrides `simple`</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} simple />
            <Button icon={<User />} label="Users" simple primary />
          </Box>
        </Box>
      </Box>
    </Grommet>
  </>
);

storiesOf('Button', module).add('Simple', () => <Simple />);
