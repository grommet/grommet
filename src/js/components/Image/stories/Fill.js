import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Image, Anchor } from 'mnet-ui-base';

const Fill = () => {
  return (
    <>
      <Box align="start" gap="small">
        <Box height="small" width="small" border>
          <Anchor href="#">
            <Image fit="cover" fill src="//v2.mnet.io/assets/IMG_4245.jpg" />
          </Anchor>
        </Box>
        <Box height="small" width="small" border>
          <Anchor href="#">
            <Image fit="contain" fill src="//v2.mnet.io/assets/IMG_4245.jpg" />
          </Anchor>
        </Box>
      </Box>
    </>
  );
};

storiesOf('Image', module).add('Fill', () => <Fill />);
