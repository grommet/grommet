import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Anchor, Grommet } from '../';

storiesOf('Anchor', module)
  .add('Default', () => <Grommet><Anchor href='#'>Link</Anchor></Grommet>)
  .add('Icon', () => <Grommet><Anchor icon={<Add />} label='Add' href='#' /></Grommet>)
  .add('With Text', () => (
    <Grommet>
      This is a <Anchor label='link' href='#' /> with text.
    </Grommet>
  ));
