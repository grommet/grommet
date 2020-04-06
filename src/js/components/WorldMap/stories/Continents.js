import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [active, setActive] = React.useState();
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <WorldMap
          continents={[
            {
              name: 'Africa',
              color: 'graph-1',
              onClick: () => setActive(!active),
            },
          ]}
        />
        {active && <Box margin="large">Africa</Box>}
      </Box>
    </Grommet>
  );
};

storiesOf('WorldMap', module).add('Continents', () => <Example />);
