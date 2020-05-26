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

storiesOf('WorldMap', module).add('Simple', () => <Example />);
