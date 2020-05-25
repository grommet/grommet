import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box } from 'mnet-ui-base';

const BackgroundBox = () => (
  <div>
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
    </Box>
  </div>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Box', module).add('Background', () => (
    <BackgroundBox />
  ));
}
