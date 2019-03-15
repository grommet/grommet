import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

const Simple = () => (
  <Grommet theme={grommet}>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </Grommet>
);

const Fit = () => (
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

const Fallback = () => (
  <Grommet theme={grommet}>
    <Image
      fallback="//v2.grommet.io/assets/IMG_4245.jpg"
      src="//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
    />
  </Grommet>
);

const Opacity = () => (
  <Grommet theme={grommet}>
    <Box gap="small" direction="row">
      <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity="strong" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
    <Box gap="small" direction="row">
      <Image opacity="medium" src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity="weak" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
    <Box gap="small" direction="row">
      <Image opacity="0.6" src="//v2.grommet.io/assets/IMG_4245.jpg" />
      <Image opacity src="//v2.grommet.io/assets/IMG_4245.jpg" />
    </Box>
  </Grommet>
);

storiesOf('Image', module)
  .add('Simple', () => <Simple />)
  .add('Fit', () => <Fit />)
  .add('Fallback', () => <Fallback />)
  .add('Opacity', () => <Opacity />);
