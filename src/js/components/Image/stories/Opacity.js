import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Image } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Opacity = () => (
  <MnetUIBase theme={mnet}>
    <Box gap="small" direction="row">
      <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity="strong" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
    <Box gap="small" direction="row">
      <Image opacity="medium" src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity="weak" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
    <Box gap="small" direction="row">
      <Image opacity={false} src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
    <Box gap="small" direction="row">
      <Image opacity="0.6" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
  </MnetUIBase>
);

storiesOf('Image', module).add('Opacity', () => <Opacity />);
