import React from 'react';
import { storiesOf } from '@storybook/react';

import { Link, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Size = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
          size => (
            <Box key={size} margin="small">
              <Link size={size} label={size} href="#somewhere" />
            </Box>
          ),
        )}
      </Box>
    </Grommet>
  );
};

storiesOf('Link', module).add('Size', () => <Size />);
