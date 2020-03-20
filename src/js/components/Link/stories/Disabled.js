import React from 'react';
import { storiesOf } from '@storybook/react';

import { Link, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Disabled = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box margin="small">
          <Link href="#disabled" disabled label="Disabled Anchor" />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Link', module).add('Disabled', () => <Disabled />);
