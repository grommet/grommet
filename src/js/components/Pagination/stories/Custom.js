import React from 'react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormPreviousLink, FormNextLink } from 'grommet-icons';
import { ThemeContext } from 'styled-components';
import { hpe } from 'grommet-theme-hpe';
import { Pagination } from '../Pagination';

const customTheme = deepMerge(grommet, {
  pagination: {
    button: {
      color: 'text-strong',
      active: {
        background: {
          color: 'salmon',
        },
        color: 'text',
      },
      hover: {
        background: {
          color: 'skyblue',
        },
      },
    },
    controls: {
      gap: 'xxsmall',
    },
    icons: {
      next: FormNextLink,
      previous: FormPreviousLink,
    },
  },
});

const secondTheme = deepMerge(hpe, {
  pagination: {
    button: 'secondary',
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box align="start" pad="small" gap="small">
      <Text>Custom Theme</Text>
      <Pagination numItems={237} />

      <Text>Reference Button Kind secondary by string with HPE theme</Text>
      <ThemeContext.Extend value={secondTheme}>
        <Pagination numItems={237} />
      </ThemeContext.Extend>
    </Box>
  </Grommet>
);
