import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Anchor, Box } from '..';
import { Add } from 'grommet-icons';

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};

const Themed = () => (
  <Grommet theme={customTheme}>
    <Box pad="medium">
      <Anchor icon={<Add />} label="Add" color="custom" />
    </Box>
  </Grommet>
);

const Plain = () => (
  <Fragment>
    <Grommet plain>
      <Box pad="medium">
        <p>Plain Grommet</p>
      </Box>
    </Grommet>
    <Grommet>
      <Box pad="medium">
        <p>Not plain Grommet</p>
      </Box>
    </Grommet>
  </Fragment>
);

storiesOf('Grommet', module)
  .add('Theme', () => <Themed />)
  .add('Plain', () => <Plain />);
