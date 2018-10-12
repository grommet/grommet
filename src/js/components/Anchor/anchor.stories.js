import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Anchor, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

storiesOf('Anchor', module)
  .add('Default', () => (
    <Grommet theme={grommet}>
      <Anchor href='#'>Link</Anchor>
    </Grommet>
  ))
  .add('Icon', () => (
    <Grommet theme={grommet}>
      <Anchor icon={<Add />} label='Add' href='#' />
    </Grommet>
  ))
  .add('With Text', () => (
    <Grommet theme={grommet}>
      This is a <Anchor label='link' href='#' /> with text.
    </Grommet>
  ));
