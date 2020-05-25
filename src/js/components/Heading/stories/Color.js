import React from 'react';
import { storiesOf } from '@storybook/react';
import { Heading } from 'mnet-ui-base';

const Color = () => (
  <>
    <Heading color="accent-1">Colored Heading</Heading>
  </>
);

storiesOf('Heading', module).add('Color', () => <Color />);
