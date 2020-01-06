import React from 'react';
import { storiesOf } from '@storybook/react';

import { mnet, MnetUIBase, Anchor, Box } from 'mnet-ui-base';
import { Add } from 'grommet-icons';

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};

const Themed = () => (
  <MnetUIBase theme={customTheme}>
    <Box pad="medium">
      <Anchor icon={<Add />} label="Add" color="custom" />
    </Box>
  </MnetUIBase>
);

const Plain = () => (
  <>
    <MnetUIBase plain>
      <Box pad="medium">
        <p>Plain MnetUIBase</p>
      </Box>
    </MnetUIBase>
    <MnetUIBase>
      <Box pad="medium">
        <p>Not plain MnetUIBase</p>
      </Box>
    </MnetUIBase>
  </>
);

const MnetUIBaseVars = () => (
  <MnetUIBase theme={mnet} cssVars>
    <Box pad="medium" background="var(--accent-2)" gap="medium">
      <Box>
        Checkout MnetUIBase variables, you can find them in the StyledMnetUIBase
        DOM.
      </Box>
      <Box with>
        For example, the background color in this Box is using var(--accent-2)
      </Box>
    </Box>
  </MnetUIBase>
);

storiesOf('MnetUIBase', module)
  .add('Plain', () => <Plain />)
  .add('Theme', () => <Themed />)
  .add('Vars', () => <MnetUIBaseVars />);
