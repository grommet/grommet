import React from 'react';

import { Box, Image } from 'grommet';

export const Fit = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" gap="medium">
    <Box height="small" width="small" border>
      <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="contain" />
    </Box>
    <Box height="small" width="small" border>
      <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Media/Image/Fit',
};
