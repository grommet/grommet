import React from 'react';

import { Box, Image } from 'grommet';

export const Opacity = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <Box gap="small" direction="row">
      <Image src="//v2.grommet.io/assets/IMG_4245.jpg" alt="default image" />
      <Image
        opacity="strong"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image strong opacity"
      />
    </Box>
    <Box gap="small" direction="row">
      <Image
        opacity="medium"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image medium opacity"
      />
      <Image
        opacity="weak"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image with weak opacity"
      />
    </Box>
    <Box gap="small" direction="row">
      <Image
        opacity={false}
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image without opacity effect"
      />
      <Image
        opacity
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image with default opacity"
      />
    </Box>
    <Box gap="small" direction="row">
      <Image
        opacity="0.6"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="image with 60% opacity"
      />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Media/Image/Opacity',
};
