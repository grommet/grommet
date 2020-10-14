import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Grommet, Tip } from 'grommet';

const Example = () => {
  return (
    <Grommet theme={grommet}>
      <Box pad="large">
        <Tip
          align="start" // Consider moving to the component level
          content={
            <Box background="light-2" round="medium">
              Tip
            </Box>
          }
        >
          Shimi
        </Tip>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
