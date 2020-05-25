import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Image } from 'mnet-ui-base';

const Fit = () => (
  <>
    <Box align="start" gap="medium">
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="contain" />
      </Box>
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
      </Box>
    </Box>
  </>
);

storiesOf('Image', module).add('Fit', () => <Fit />);
