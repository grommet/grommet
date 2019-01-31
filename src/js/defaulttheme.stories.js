import React from 'react';
import { storiesOf } from '@storybook/react';

import { base } from './themes';
import { deepMerge } from './utils';

import { Box, extendDefaultTheme } from '.';

extendDefaultTheme(
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
