import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Size = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
          size => (
            <Box key={size} margin="small">
              <Anchor size={size} label={size} href="#" />
            </Box>
          ),
        )}
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Anchor', module).add('Size', () => <Size />);
