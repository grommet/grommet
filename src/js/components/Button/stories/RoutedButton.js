import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const RouteButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Text margin="medium" size="small">
        Note: RoutedButton will soon be deprecated
      </Text>
      <RoutedButton label="Go" path="/" />
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('RoutedButton', () => <RouteButton />);
