import React from 'react';
import { storiesOf } from '@storybook/react';

import { base } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { Box, initializeDefaultTheme } from 'grommet';

initializeDefaultTheme(
  deepMerge(base, {
    global: {
      colors: {
        brand: 'red',
      },
    },
  }),
);

const CustomDefaultProps = () => (
  <Box background="brand" pad="small">
    Hello
  </Box>
);

storiesOf('Components', module).add('Default Theme', () => (
  <CustomDefaultProps />
));
