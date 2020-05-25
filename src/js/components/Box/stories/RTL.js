import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'mnet-ui-base';

const RTLBox = () => (
  <div dir="rtl">
    <Box direction="row" align="center" pad="small" gap="small" border>
      <Box direction="row" align="center" pad="small" border="start">
        border start
      </Box>
      <Box
        direction="row"
        align="center"
        pad={{ start: 'large' }}
        background="brand"
      >
        pad start
      </Box>
      <Box
        direction="row"
        align="center"
        margin={{ start: 'large' }}
        background="brand"
      >
        margin start
      </Box>
    </Box>
  </div>
);

storiesOf('Box', module).add('RTL', () => <RTLBox />);
