import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const Color = () => (
  <Grommet theme={grommet}>
    <Heading color="accent-1">Colored Heading</Heading>
  </Grommet>
);

storiesOf('Heading', module).add('Color', () => <Color />);
