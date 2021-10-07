import React from 'react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

export const Color = () => (
  <Grommet theme={grommet}>
    <Heading color="accent-1">Colored Heading</Heading>
  </Grommet>
);

export default {
  title: 'Type/Heading/Color',
};
