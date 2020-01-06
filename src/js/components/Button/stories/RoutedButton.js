import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, RoutedButton, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const RouteButton = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <Text margin="medium" size="small">
        Note: RoutedButton will soon be deprecated
      </Text>
      <RoutedButton label="Go" path="/" />
    </Box>
  </MnetUIBase>
);

storiesOf('Button', module).add('RoutedButton', () => <RouteButton />);
