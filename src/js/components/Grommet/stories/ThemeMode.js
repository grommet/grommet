import React from 'react';

import { Grommet, Box, grommet } from 'grommet';

export const ThemeMode = () => (
  <Grommet theme={grommet} themeMode="auto">
    <Box pad="medium">"auto" themeMode</Box>
  </Grommet>
);

export default {
  title: 'Utilities/Grommet/ThemeMode',
};
