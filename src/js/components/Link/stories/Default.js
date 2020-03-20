import React from 'react';
import { storiesOf } from '@storybook/react';

import { Link, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Default = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Link href="#accessible">Link</Link>
      </Box>
    </Grommet>
  );
};

storiesOf('Link', module).add('Default', () => <Default />);
