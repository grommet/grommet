import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Disabled = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box margin="small">
          <Anchor disabled label="Disabled Anchor" />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Anchor', module).add('Disabled', () => <Disabled />);
