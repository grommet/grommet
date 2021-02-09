import React from 'react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const DefaultAnchor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Anchor href="#">Link</Anchor>
    </Box>
  </Grommet>
);

export const Default = () => <DefaultAnchor />;
Default.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Default',
};
