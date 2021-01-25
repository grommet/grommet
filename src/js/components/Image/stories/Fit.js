import React from 'react';

import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

export const Fit = () => (
  <Grommet theme={grommet}>
    <Box align="start" gap="medium">
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="contain" />
      </Box>
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Media/Image/Fit',
};
