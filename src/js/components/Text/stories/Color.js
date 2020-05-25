import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Color = () => (
  <MnetUIBase theme={mnet}>
    <Text color="accent-1">Colored Text</Text>
  </MnetUIBase>
);

storiesOf('Text', module).add('Color', () => <Color />);
