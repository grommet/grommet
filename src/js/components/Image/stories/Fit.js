import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Image } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Fit = () => (
  <MnetUIBase theme={mnet}>
    <Box align="start" gap="medium">
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="contain" />
      </Box>
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
      </Box>
    </Box>
  </MnetUIBase>
);

storiesOf('Image', module).add('Fit', () => <Fit />);
