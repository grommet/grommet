import React from 'react';

import { Add } from 'grommet-icons';

import { Anchor, Box } from 'grommet';

export const Color = () => (
  <Box>
    <Box pad="medium" gap="medium">
      <Anchor icon={<Add />} href="#" />
      <Anchor icon={<Add />} label="Add" href="#" />
      <Anchor label="Add" href="#" />
    </Box>
    <Box background="dark-1" pad="medium" gap="medium">
      <Anchor icon={<Add />} href="#" />
      <Anchor icon={<Add />} label="Add" href="#" />
      <Anchor icon={<Add />} label="Add" href="#" />
      <Anchor label="Add" href="#" />
    </Box>
  </Box>
);

export default {
  title: 'Controls/Anchor/Color',
  component: Anchor,
};
