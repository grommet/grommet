import React from 'react';
import { storiesOf } from '@storybook/react';

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
    default: {
      color: 'text-strong',
      border: undefined,
      font: {
        weight: 700,
      },
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
    },
    active: {
      background: {
        color: 'background-contrast',
      },
      color: 'text',
    },
    hover: {
      default: {
        background: {
          color: 'background-contrast',
        },
        color: undefined,
      },
    },
  },
});

const Custom = () => (
  <Grommet theme={customTheme}>
    <Box align="start" pad="small" gap="small">
      <Text>Custom Theme</Text>
      <Pagination numItems={237} />
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('Custom', () => <Custom />);
