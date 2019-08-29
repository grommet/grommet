import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Default = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Anchor href="#">Link</Anchor>
      </Box>
    </Grommet>
  );
};

storiesOf('Anchor', module).add('Default', () => <Default />);
