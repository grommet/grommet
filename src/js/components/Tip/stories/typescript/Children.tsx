import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Tip } from '../../Tip';

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box align="center" pad="xlarge" gap="xlarge" fill background="dark-1">
        <Text>Tooltip will be displayed once hovering on the Tip's Child</Text>
        <Tip
          content={
            <Box align="center">
              <Text color="white">Hello</Text>
            </Box>
          }
        >
          String Child
        </Tip>
        <Tip
          dropProps={{ align: { right: 'left' } }}
          content={
            <Box
              background="light-4"
              round={{ size: 'medium', corner: 'left' }}
              align="center"
              margin="medium"
              pad="small"
            >
              <Text color="brand">Tooltip</Text>
            </Box>
          }
        >
          <Box background="brand" pad="small" flex={false}>
            Box Child
          </Box>
        </Tip>
        <Tip
          dropProps={{ align: { left: 'right' } }}
          content={
            <Box
              background="accent-1"
              round="medium"
              align="center"
              margin="medium"
              pad="small"
            >
              <Text color="brand">Tooltip</Text>
            </Box>
          }
        >
          <Button label=" Button Child" />
        </Tip>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Children', () => <Example />, {
  chromatic: { disable: true },
});
