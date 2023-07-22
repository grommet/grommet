import React from 'react';

import { Gremlin, IceCream } from 'grommet-icons';
import { Stack, Box, Diagram } from 'grommet';

const connections = [
  {
    fromTarget: 'gremlin',
    toTarget: 'yummy',
    thickness: 'xxsmall',
    endpoint: 'arrow',
    anchor: 'center',
    color: 'red',
  },
  {
    fromTarget: 'gremlin',
    toTarget: 'yummy',
    thickness: 'xxsmall',
    endpoint: { from: 'arrow' },
    anchor: 'horizontal',
    color: 'blue',
  },
  {
    fromTarget: 'gremlin',
    toTarget: 'yummy',
    thickness: 'xxsmall',
    endpoint: { to: 'arrow' },
    anchor: 'vertical',
    color: 'green',
  },
];

const connections2 = [
  {
    fromTarget: 'gremlin2',
    toTarget: 'yummy2',
    thickness: 'xxsmall',
    endpoint: { from: 'arrow' },
    anchor: 'center',
    color: 'orange',
  },
  {
    fromTarget: 'gremlin2',
    toTarget: 'yummy2',
    thickness: 'xxsmall',
    endpoint: { to: 'arrow' },
    anchor: 'horizontal',
    color: 'pink',
  },
  {
    fromTarget: 'gremlin2',
    toTarget: 'yummy2',
    thickness: 'xxsmall',
    endpoint: 'arrow',
    anchor: 'vertical',
    color: 'black',
  },
];

export const Arrow = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <>
    <Stack>
      <Box fill pad="xlarge">
        <Box align="start">
          <Gremlin id="gremlin" color="neutral-2" size="xlarge" />
        </Box>
        <Box
          align="end"
          pad={{ vertical: 'large' }}
          style={{ marginTop: '5rem' }}
        >
          <IceCream id="yummy" color="neutral-2" size="xlarge" />
        </Box>
      </Box>
      <Diagram connections={connections} />
    </Stack>
    <Stack>
      <Box fill pad="xlarge">
        <Box align="start">
          <Gremlin id="gremlin2" color="neutral-2" size="xlarge" />
        </Box>
        <Box
          align="end"
          pad={{ vertical: 'large' }}
          style={{ marginTop: '5rem' }}
        >
          <IceCream id="yummy2" color="neutral-2" size="xlarge" />
        </Box>
      </Box>
      <Diagram connections={connections2} />
    </Stack>
  </>
  // </Grommet>
);

export default {
  title: 'Visualizations/Diagram/Arrow',
};
