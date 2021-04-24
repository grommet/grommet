import React from 'react';

import {
  Box,
  Grommet,
  RoutedButton as GrommetRoutedButton,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const RoutedButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Text margin="medium" size="small">
        Note: RoutedButton will soon be deprecated
      </Text>
      <GrommetRoutedButton label="Go" path="/" />
    </Box>
  </Grommet>
);

RoutedButton.storyName = 'Routed button';

export default {
  title: `Controls/Button/Routed button`,
};
