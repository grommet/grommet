import React from 'react';

import { hpe } from 'grommet-theme-hpe';
import { Box, Grommet, TimeInput } from 'grommet';
import { deepMerge, normalizeColor } from 'grommet/utils';

// DELETE BEFORE MERGE: This story is a temporary visual
//  reference for reviewers to validate the TimeInput
//  component against the HPE theme.

// Extend the HPE theme with TimeInput-specific overrides.
// This story exists to validate what the TimeInput needs from the HPE theme
// and to act as a visual reference for reviewers.
const hpeTimeInputTheme = deepMerge(hpe, {
  timeInput: {
    active: {
      pad: '5xsmall',
    },
    drop: {
      option: {
        selected: {
          background: 'background-selected-primary-strong',
          color: 'white',
          hover: { background: 'background-selected-primary-strong-hover' },
          // text-onSelectedPrimaryStrong has intentionally swapped light/dark
          // values in HPE tokens. Invert theme.dark so the token resolves
          // as authored (same pattern as HPE checkbox icon extend).
          extend: ({ theme }) => {
            const invertedTheme = { ...theme, dark: !theme.dark };
            const color = normalizeColor(
              'text-onSelectedPrimaryStrong',
              invertedTheme,
            );
            return `color: ${color};`;
          },
        },
      },
    },
  },
});

export const Hpe = () => (
  <Grommet theme={hpeTimeInputTheme}>
    <Box pad="large" gap="medium" width="medium">
      <TimeInput format="12" defaultValue="09:30:00 AM" />
      <TimeInput format="24" defaultValue="14:45:00" />
      <TimeInput format="12" disabled defaultValue="09:30:00 AM" />
      <TimeInput format="12" readOnly defaultValue="09:30:00 AM" />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed/HPE',
};
