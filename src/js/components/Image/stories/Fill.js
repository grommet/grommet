import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Image, Anchor } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Fill = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="start" gap="small">
        <Box height="small" width="small" border>
          <Anchor href="#">
            <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" />
          </Anchor>
        </Box>
        <Box height="small" width="small" border>
          <Anchor href="#">
            <Image
              fit="contain"
              fill
              src="//v2.grommet.io/assets/IMG_4245.jpg"
            />
          </Anchor>
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Image', module).add('Fill', () => <Fill />);
