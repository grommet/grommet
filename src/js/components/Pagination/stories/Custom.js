import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormPreviousLink } from 'grommet-icons/icons/FormPreviousLink';
import { FormNextLink } from 'grommet-icons/icons/FormNextLink';
import { ThemeContext } from 'styled-components';

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

const secondaryTheme = deepMerge(grommet, {
  button: {
    default: {},
    bright: {
      color: 'text-strong',
      border: {
        color: 'skyblue',
        width: '2px',
      },
    },
    active: {
      bright: {
        background: {
          color: '#CA9CEA',
        },
        border: {
          color: 'transparent',
        },
        color: 'text',
      },
    },
    hover: {
      bright: {
        background: {
          color: 'skyblue',
        },
      },
    },
  },
  pagination: {
    button: 'bright',
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box direction="row" gap="large">
      <Box
        align="start"
        pad={{ top: 'medium', bottom: 'medium', horizontal: 'medium' }}
        gap="large"
      >
        <>
          <Text margin={{ bottom: 'small' }}>
            Custom Theme via theme.pagination.button
          </Text>
          <Pagination numberItems={237} />
        </>
        <>
          <Text margin={{ bottom: 'small' }}>
            Reference Button Kind by string
          </Text>
          <ThemeContext.Extend value={secondaryTheme}>
            <Pagination numberItems={237} />
          </ThemeContext.Extend>
        </>
      </Box>
      <Box
        align="start"
        background="black"
        pad={{ top: 'medium', bottom: 'medium', horizontal: 'medium' }}
        gap="large"
      >
        <>
          <Text margin={{ bottom: 'small' }}>
            Custom Theme via theme.pagination.button
          </Text>
          <Pagination numberItems={237} />
        </>
        <>
          <Text margin={{ bottom: 'small' }}>
            Reference Button Kind by string
          </Text>
          <ThemeContext.Extend value={secondaryTheme}>
            <Pagination numberItems={237} />
          </ThemeContext.Extend>
        </>
      </Box>
    </Box>
  </Grommet>
);
