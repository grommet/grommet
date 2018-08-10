import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add, Trash } from 'grommet-icons';

import { Anchor, Grommet } from '../';
import { grommet } from '../../themes';

const customColorTheme = {
  anchor: {
    colors: {
      light: 'red',
      dark: 'white',
    },
  },
};

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
  ))
  .add('Custom color', () => (
    <Grommet theme={customColorTheme}>
      <Box gap='small'>
        <Anchor icon={<Trash />} label='Delete' href='#' />
        <Box background='light-2'>
          This is a <Anchor label='link' href='#' /> with dark text.
        </Box>
        <Box background='dark-2'>
          This is a <Anchor label='link' href='#' /> with light text.
        </Box>
      </Box>
    </Grommet>
  ));
