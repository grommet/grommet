import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Size = () => {
  return (
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
  );
};

storiesOf('Anchor', module).add('Size', () => <Size />);
