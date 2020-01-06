import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box } from 'mnet-ui-base';
import { mnet } from '../../../themes';

const BackgroundBox = () => (
  <MnetUIBase theme={mnet}>
    <Box pad="small" gap="small" align="start">
      <Box
        pad="small"
        background={{ color: 'brand', opacity: true }}
        elevation="large"
      >
        brand opacity
      </Box>
      <Box pad="small" background="brand" elevation="large">
        brand
      </Box>
      <Box pad="small" background={{ color: 'brand' }} elevation="large">
        brand object
      </Box>
      <Box
        pad="small"
        background={{
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        image
      </Box>
      <Box
        pad="small"
        background={{
          color: 'accent-2',
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        image + color
      </Box>
      <Box background="dark-1" pad="medium">
        <Box background="#FFFFFF08" pad="small">
          low opacity on dark background
        </Box>
      </Box>
      <Box background="light-5" pad="medium">
        <Box background="#11111108" pad="small">
          low opacity on light background
        </Box>
      </Box>
    </Box>
  </MnetUIBase>
);

storiesOf('Box', module).add('Background', () => <BackgroundBox />);
