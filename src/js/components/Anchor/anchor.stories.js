import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

storiesOf('Anchor', module)
  .add('Default', () => (
    <Grommet theme={grommet}>
      <Anchor href="#">Link</Anchor>
    </Grommet>
  ))
  .add('Colors', () => (
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Anchor icon={<Add />} href="#" />
        <Anchor icon={<Add />} label="Add" href="#" />
        <Anchor label="Add" href="#" />
      </Box>
      <Box background="dark-1" pad="medium" gap="medium">
        <Anchor icon={<Add />} href="#" />
        <Anchor icon={<Add />} label="Add" href="#" />
        <Anchor icon={<Add />} label="Add" href="#" />
        <Anchor label="Add" href="#" />
      </Box>
    </Grommet>
  ))
  .add('Inline', () => (
    <Grommet theme={grommet}>
      This is <Anchor label="an inline link" href="#" /> with surrounding text.
    </Grommet>
  ));
