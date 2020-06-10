import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleVideo = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Video {...props}>
        <source
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-webm-file.webm"
          type="video/webm"
        />
        <source
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-ogv-file.ogv"
          type="video/ogg"
        />
        <source
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          type="video/mp4"
        />
        <source
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-3gp-file.3gp"
          type="video/3gp"
        />
      </Video>
    </Box>
  </Grommet>
);

storiesOf('Video', module)
  .add('Simple', () => <SimpleVideo />)
  .add('Controls Below', () => <SimpleVideo controls="below" />);
