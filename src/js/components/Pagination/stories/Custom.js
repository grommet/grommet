import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormPreviousLink } from 'grommet-icons/icons/FormPreviousLink';
import { FormNextLink } from 'grommet-icons/icons/FormNextLink';
import { ThemeContext } from 'styled-components';
import { hpe } from 'grommet-theme-hpe';

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

const secondaryTheme = deepMerge(hpe, {
  pagination: {
    button: 'secondary',
  },
});

const primaryTheme = deepMerge(hpe, {
  pagination: {
    button: 'primary',
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box direction="row">
      <Box
        align="start"
        pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
        gap="small"
      >
        <Text>Custom Theme</Text>
        <Pagination numberItems={237} />

        <Text>Reference Button Kind secondary by string with HPE theme</Text>
        <ThemeContext.Extend value={secondaryTheme}>
          <Pagination numberItems={237} />
        </ThemeContext.Extend>

        <Text>Reference Button Kind primary by string with HPE theme</Text>
        <ThemeContext.Extend value={primaryTheme}>
          <Pagination numberItems={237} />
        </ThemeContext.Extend>
      </Box>
      <Box
        align="start"
        background="black"
        pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
        gap="small"
      >
        <Text>Custom Theme</Text>
        <Pagination numberItems={237} />

        <Text>Reference Button Kind secondary by string with HPE theme</Text>
        <ThemeContext.Extend value={secondaryTheme}>
          <Pagination numberItems={237} />
        </ThemeContext.Extend>

        <Text>Reference Button Kind primary by string with HPE theme</Text>
        <ThemeContext.Extend value={primaryTheme}>
          <Pagination numberItems={237} />
        </ThemeContext.Extend>
      </Box>
    </Box>
  </Grommet>
);
