import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from 'grommet-icons';

import { Box, Text } from 'mnet-ui-base';

const OnClickBox = () => (
  <div>
    <Box justify="center" align="center" pad="large">
      {/* eslint-disable no-alert */}
      <Box
        border
        pad="large"
        align="center"
        round
        gap="small"
        hoverIndicator
        onClick={() => {
          alert('clicked');
        }}
      >
        <Attraction size="large" />
        <Text>Party</Text>
      </Box>
    </Box>
  </div>
);

storiesOf('Box', module).add('onClick', () => <OnClickBox />);
