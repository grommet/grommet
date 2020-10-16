import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Tip } from '../../Tip';

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box
        align="center"
        alignSelf="center"
        justify="center"
        pad="medium"
        gap="large"
        fill
        background="dark-1"
      >
        <Text>
          The Tooltip will be displayed once hovering on the Tip's Child
        </Text>
        <Box direction="row" gap="large" align="center">
          <Tip
            align="start"
            content={
              <Box background="light-4" round="medium" align="center">
                Tooltip
              </Box>
            }
          >
            String Child
          </Tip>
          <Tip
            align="start"
            content={
              <Box
                background="light-4"
                round="medium"
                align="center"
                margin="small"
                pad="small"
              >
                <Text color="brand">Tooltip</Text>
              </Box>
            }
          >
            <Box background="brand" pad="small">
              Box Child
            </Box>
          </Tip>
          <Tip
            align="start"
            content={
              <Box
                background="light-4"
                round="medium"
                align="center"
                margin="small"
                pad="small"
              >
                <Text color="brand">Tooltip</Text>
              </Box>
            }
          >
            <Button label=" Button Child" />
          </Tip>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Children', () => <Example />, {
  chromatic: { disable: true },
});
