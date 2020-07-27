import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Anchor, Box } from 'grommet';
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
  <>
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
  </>
);

const GrommetVars = () => (
  <Grommet theme={grommet} cssVars>
    <Box pad="medium" background="var(--accent-2)" gap="medium">
      <Box>
        Checkout Grommet variables, you can find them in the StyledGrommet DOM.
      </Box>
      <Box with>
        For example, the background color in this Box is using var(--accent-2)
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Grommet', module)
  .add('Plain', () => <Plain />)
  .add('Theme', () => <Themed />)
  .add('Vars', () => <GrommetVars />);
