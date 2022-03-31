import React from 'react';

import { Box, Image, Anchor } from 'grommet';

export const Fill = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" gap="small">
    <Box height="small" width="small" border>
      <Anchor href="#">
        <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" />
      </Anchor>
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Media/Image/Fill',
};
