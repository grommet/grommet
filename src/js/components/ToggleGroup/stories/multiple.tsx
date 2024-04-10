import React from 'react';
import { Box, ToggleGroup } from 'grommet';

export const Multiple = () => (
  <Box pad="large">
    <ToggleGroup options={['Bold', 'Italic', 'Underline']} multiple />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/Multiple',
};
