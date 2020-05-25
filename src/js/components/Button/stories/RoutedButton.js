import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, RoutedButton, Text } from 'mnet-ui-base';

const RouteButton = () => (
  <>
    <Box align="center" pad="large">
      <Text margin="medium" size="small">
        Note: RoutedButton will soon be deprecated
      </Text>
      <RoutedButton label="Go" path="/" />
    </Box>
  </>
);

storiesOf('Button', module).add('RoutedButton', () => <RouteButton />);
