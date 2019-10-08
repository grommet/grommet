import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Image, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

const ImageAnchor = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="start" height="small" width="small" border>
        <Anchor href="#">
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        </Anchor>
      </Box>
    </Grommet>
  );
};

storiesOf('Image', module).add('Image Anchor', () => <ImageAnchor />);
