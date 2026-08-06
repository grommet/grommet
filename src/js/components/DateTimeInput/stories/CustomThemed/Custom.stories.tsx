// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { hpe } from 'grommet-theme-hpe';
import { Box, Grommet, TimeInput, DateTimeInput } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { light, dark, components } from 'hpe-design-tokens/grommet';
import {
  Clock as ClockIcon,
  Calendar as CalendarIcon,
} from '@hpe-design/icons-grommet';

// THIS STORY IS TO TEST WHAT THEME NEEDS TO PROVIDE FOR THE TIMEINPUT AND DATETIMEINPUT COMPONENTS
// THIS SHOULD BE DELETED BEFORE WE MERGE INTO MASTER IT IS ONLY FOR REVIEWING THEME CHANGES AND SHOULD NOT BE USED AS A REFERENCE FOR IMPLEMENTATION

// Pulling the raw values directly from the token files gives us the color
// exactly as authored.
const textOnSelectedPrimaryStrong = {
  light: light.hpe.color.text.onSelectedPrimaryStrong,
  dark: dark.hpe.color.text.onSelectedPrimaryStrong,
};

// Extend the HPE theme with TimeInput-specific overrides.
// This story exists to validate what the TimeInput needs from the HPE theme
// and to act as a visual reference for reviewers.
const hpeTimeInputTheme = deepMerge(hpe, {
  dateTimeInput: {
    button: {
      margin: { right: '3xsmall' },
    },
    container: {
      round:
        components.hpe.formField.default.medium.input.container.borderRadius,
    },
    active: {
      background: 'background-active',
      pad: '5xsmall',
      indicator: {
        color: 'focus',
      },
    },
    drop: {
      pad: 'small',
      gap: 'small',
      border: {
        color: 'border',
        size: 'xsmall',
      },
    },
    separator: {
      dateTimeGap: '5xsmall',
    },
    icon: {
      calendar: CalendarIcon,
    },
  },
  timeInput: {
    container: {
      round:
        components.hpe.formField.default.medium.input.container.borderRadius,
    },
    button: {
      margin: { right: '3xsmall' },
    },
    active: {
      background: 'background-active',
      pad: '5xsmall',
      indicator: {
        color: 'focus',
        // size: 'small', we do not need same as grommet
      },
    },
    drop: {
      option: {
        hover: {
          background: 'background-active',
        },
        selected: {
          background: 'background-selected-primary-strong',
          color: textOnSelectedPrimaryStrong,
          hover: { background: 'background-selected-primary-strong-hover' },
        },
      },
    },
    icon: {
      clock: ClockIcon,
    },
  },
});

export const Hpe = () => (
  <Grommet theme={hpeTimeInputTheme}>
    <Box pad="large" gap="medium" width="medium">
      <TimeInput format="12" readOnly defaultValue="09:30:00" />
      <DateTimeInput format="12" defaultValue="2024-01-01T09:30:00" />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed/HPE',
};
