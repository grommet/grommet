import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Color = () => (
  <Grommet theme={grommet}>
    <Text color="accent-1">Colored Text</Text>
  </Grommet>
);

storiesOf('Text', module).add('Color', () => <Color />);
