import React from 'react';
import { storiesOf } from '@storybook/react';

import { Gremlin, IceCream } from 'grommet-icons';
import { Stack, grommet, Grommet, Box, Diagram } from 'grommet';

const connection = {
  id: 'shimi',
  anchor: 'horizontal',
  color: 'accent-1',
  thickness: 'xsmall',
  type: 'curved',
  toTarget: 'yummy',
  fromTarget: 'gremlin',
  round: true,
};

const connections = [connection];

const Connections = () => {
  return (
    <Grommet theme={grommet}>
      <Stack>
        <Box fill pad="xlarge">
          <Box align="start">
            <Gremlin id="gremlin" color="neutral-2" size="xlarge" />
          </Box>
          <Box align="end" pad={{ vertical: 'large' }}>
            <IceCream id="yummy" color="neutral-2" size="xlarge" />
          </Box>
        </Box>
        <Diagram connections={connections} />
      </Stack>
    </Grommet>
  );
};

storiesOf('TypeScript/Diagram', module).add('Connections', () => (
  <Connections />
));
