import React from 'react';

import { Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Color = () => (
  <Grommet theme={grommet}>
    <Text color="accent-1">Colored Text</Text>
  </Grommet>
);

export default {
  title: 'Type/Text/Color',
};
