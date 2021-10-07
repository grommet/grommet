import React from 'react';

import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Video>
        <source src="small.mp4" type="video/mp4" />
        <source
          src="http://techslides.com/demos/sample-videos/small.webm"
          type="video/webm"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.ogv"
          type="video/ogg"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.3gp"
          type="video/3gp"
        />
      </Video>
    </Box>
  </Grommet>
);

export default {
  title: 'Media/Video/Simple',
};
