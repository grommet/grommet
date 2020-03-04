import React from 'react';
import { storiesOf } from '@storybook/react';
import { MnetUIBase, Heading } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Color = () => (
  <MnetUIBase theme={mnet}>
    <Heading color="accent-1">Colored Heading</Heading>
  </MnetUIBase>
);

storiesOf('Heading', module).add('Color', () => <Color />);
