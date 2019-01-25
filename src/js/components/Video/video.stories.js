import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleVideo = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Video controls={false}>
        <source
          src="http://techslides.com/demos/sample-videos/small.webm"
          type="video/webm"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.ogv"
          type="video/ogg"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.mp4"
          type="video/mp4"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.3gp"
          type="video/3gp"
        />
      </Video>
    </Box>
  </Grommet>
);

storiesOf('Video', module).add('Simple Video', () => <SimpleVideo />);
