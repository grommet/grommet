import React from 'react';

import { Grommet, Box, grommet } from 'grommet';

export const ThemeMode = () => (
  <Grommet theme={grommet} themeMode="auto">
    <Box pad="medium">Check New Theme Mode</Box>
  </Grommet>
);

export default {
  title: 'Utilities/Grommet/ThemeMode',
};
