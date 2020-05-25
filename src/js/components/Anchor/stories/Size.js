import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box } from 'mnet-ui-base';

const Size = () => {
  return (
    <div>
      <Box align="center" pad="large">
        {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
          size => (
            <Box key={size} margin="small">
              <Anchor size={size} label={size} href="#" />
            </Box>
          ),
        )}
      </Box>
    </div>
  );
};

storiesOf('Anchor', module).add('Size', () => <Size />);
