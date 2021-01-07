import React from 'react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormPreviousLink, FormNextLink } from 'grommet-icons';
import { Pagination } from '../Pagination';

const customTheme = deepMerge(grommet, {
  pagination: {
    controls: {
      gap: 'xxsmall',
    },
    icons: {
      next: FormNextLink,
      previous: FormPreviousLink,
    },
  },
  button: {
    pagination: {
      color: 'text-strong',
    },
    active: {
      background: {
        color: 'salmon',
      },
      color: 'text',
    },
    hover: {
      pagination: {
        background: {
          color: 'skyblue',
        },
      },
    },
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box align="start" pad="small" gap="small">
      <Text>Custom Theme</Text>
      <Pagination numItems={237} />
    </Box>
  </Grommet>
);
