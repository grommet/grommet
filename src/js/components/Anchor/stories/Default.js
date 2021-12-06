import React from 'react';

import { Anchor, Box } from 'grommet';

const DefaultAnchor = () => (
  <Box align="center" pad="large">
    <Anchor href="#">Link</Anchor>
  </Box>
);

export const Default = () => <DefaultAnchor />;
Default.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Default',
};
