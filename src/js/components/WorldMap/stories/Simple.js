import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <WorldMap />
      </Box>
    </Grommet>
  );
};

// chromatic disabled because snapshot is the same as SelectPlace
storiesOf('WorldMap', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
