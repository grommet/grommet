import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleVideo = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Video {...props}>
        <source src="small.mp4" type="video/mp4" />
      </Video>
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Video', module)
    .add('Simple', () => <SimpleVideo />)
    .add('Controls Below', () => <SimpleVideo controls="below" />);
}
