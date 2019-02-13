import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Anchor, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

storiesOf('Anchor', module)
  .add('Default', () => (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Anchor href="#">Link</Anchor>
      </Box>
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
  .add('Size', () => (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
          size => (
            <Box key={size} margin="small">
              <Anchor size={size} label={size} href="#" />
            </Box>
          ),
        )}
      </Box>
    </Grommet>
  ))
  .add('Inline', () => (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Paragraph>
          This is <Anchor label="an inline link" href="#" /> with surrounding
          text.
        </Paragraph>
      </Box>
    </Grommet>
  ));
