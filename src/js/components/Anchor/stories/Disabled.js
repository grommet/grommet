import React from 'react';

import { Anchor, Box } from 'grommet';

const DisabledAnchor = () => (
  <Box align="center" pad="large">
    <Box margin="small">
      <Anchor disabled label="Disabled Anchor" />
    </Box>
  </Box>
);

export const Disabled = () => <DisabledAnchor />;

export default {
  title: 'Controls/Anchor/Disabled',
};
