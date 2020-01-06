import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Text } from 'mnet-ui-base';
import { mnet } from '../../../themes';

const FixedSizesBox = () => (
  <MnetUIBase theme={mnet}>
    <Box pad="small" gap="small">
      <Box
        width="small"
        height="small"
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow={{ horizontal: 'hidden', vertical: 'scroll' }}
      >
        {Array(20)
          .fill()
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={i}>{`Small (${i})`}</Text>
          ))}
      </Box>
      <Box
        width="medium"
        height="medium"
        round="small"
        align="center"
        justify="center"
        background="brand"
      >
        Medium
      </Box>
      <Box
        width="large"
        height="large"
        round="small"
        align="center"
        justify="center"
        background="brand"
      >
        Large
      </Box>
    </Box>
  </MnetUIBase>
);

storiesOf('Box', module).add('Fixed sizes', () => <FixedSizesBox />);
