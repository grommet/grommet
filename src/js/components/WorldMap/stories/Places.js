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
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'graph-1',
              onClick: () => setActive(!active),
            },
          ]}
        />
        {active && <Box margin="large">Sydney</Box>}
      </Box>
    </Grommet>
  );
};

storiesOf('WorldMap', module).add('Places', () => <Example />);
