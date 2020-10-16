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
        <Box direction="row" gap="large" align="center">
          <Tip
            align="start"
            content={
              <Box
                margin="small"
                background="light-4"
                round="medium"
                pad="small"
                align="center"
              >
                Tooltip
              </Box>
            }
          >
            <Button label="Hover Me" />
          </Tip>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
