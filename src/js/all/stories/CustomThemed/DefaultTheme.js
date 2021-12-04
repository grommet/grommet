import React from 'react';

import { base } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { Box, extendDefaultTheme } from 'grommet';

extendDefaultTheme(
  deepMerge(base, {
    global: {
      colors: {
        brand: 'red',
      },
    },
  }),
);

export const CustomDefaultProps = () => (
  <Box background="brand" pad="small">
    Hello
  </Box>
);

CustomDefaultProps.storyName = 'Extend default';

export default {
  title: 'Utilities/Theme/Custom Themed/Extend default',
};
