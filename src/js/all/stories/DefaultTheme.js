import React from 'react';
import { storiesOf } from '@storybook/react';

import { base } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

import { Box, extendDefaultTheme } from 'mnet-ui-base';

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

storiesOf('Theme', module).add('Extend Default', () => <CustomDefaultProps />);
