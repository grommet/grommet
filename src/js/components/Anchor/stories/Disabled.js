import React from 'react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const DisabledAnchor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box margin="small">
        <Anchor disabled label="Disabled Anchor" />
      </Box>
    </Box>
  </Grommet>
);

export const Disabled = () => <DisabledAnchor />;

export default {
  title: 'Controls/Anchor/Disabled',
};
