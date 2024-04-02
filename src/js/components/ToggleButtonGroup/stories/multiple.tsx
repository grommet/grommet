import React from 'react';
import { Box, ToggleButtonGroup } from 'grommet';

export const Multiple = () => (
  <Box pad="large">
    <ToggleButtonGroup options={['Red', 'Green', 'Blue']} multiple />
  </Box>
);

export default {
  title: 'Controls/ToggleButtonGroup/Multiple',
};
