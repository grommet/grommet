import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from 'grommet-icons';

import { MnetUIBase, Box, Text } from 'mnet-ui-base';
import { mnet } from '../../../themes';

const OnClickBox = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Box', module).add('onClick', () => <OnClickBox />);
