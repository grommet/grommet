import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from 'grommet-icons';
import { Box, Button, grommet, Grommet, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  button: {
    normalized: {
      color: '#ff9999',
      hover: {
        border: {
          color: '#99ccff',
        },
      },
    },
  },
});

const Normalized = () => (
  <>
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Default Buttons (Icon only, Icon + Label)</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} color="status-warning" hoverIndicator />
            <Button icon={<User />} label="Users" color="status-warning" />
          </Box>
        </Box>
        <Box gap="small">
          <Text>Normalized Buttons</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} color="status-warning" normalized />
            <Button
              icon={<User />}
              label="Users"
              color="status-warning"
              normalized
            />
          </Box>
        </Box>
      </Box>
    </Grommet>
    <Grommet theme={customTheme}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Normalized with Custom Theme</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} normalized />
            <Button icon={<User />} label="Users" normalized />
          </Box>
        </Box>
        <Box gap="small">
          <Text>
            Normalized + Primary: uses `primary` button styling but maintains
            alignment
          </Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} normalized />
            <Button icon={<User />} label="Users" normalized primary />
          </Box>
        </Box>
      </Box>
    </Grommet>
  </>
);

storiesOf('Button', module).add('Normalized', () => <Normalized />);
