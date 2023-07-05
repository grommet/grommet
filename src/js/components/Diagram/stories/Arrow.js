import React from 'react';

import { Gremlin, IceCream } from 'grommet-icons';
import { Stack, Box, Diagram } from 'grommet';

const anchor = 'vertical';
const type = 'curved';

const connection = {
  id: 'shimi',
  anchor,
  color: 'accent-1',
  thickness: 'xsmall',
  type,
  toTarget: 'yummy',
  fromTarget: 'gremlin',
  round: true,
  arrow: 'to',
};

const connections = [connection];

export const Arrow = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Stack>
    <Box fill pad="xlarge">
      <Box align="start">
        <Gremlin id="gremlin" color="neutral-2" size="xlarge" />
      </Box>
      <Box
        align="start"
        pad={{ vertical: 'large' }}
        style={{ marginTop: '5rem' }}
      >
        <IceCream id="yummy" color="neutral-2" size="xlarge" />
      </Box>
    </Box>
    <Diagram connections={connections} />
  </Stack>
  // </Grommet>
);

export default {
  title: 'Visualizations/Diagram/Arrow',
};
