// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Grommet, Heading, TimeInput } from 'grommet';

const theme = {
  timeInput: {
    container: {
      border: { color: 'brand', size: 'small' },
      round: 'small',
    },
    display: {
      pad: { horizontal: 'small' },
      lineHeight: '1.5',
    },
    segment: {
      color: 'text',
      placeholder: { color: 'text-weak' },
      size: 'medium',
      weight: 500,
      pad: 'xxsmall',
      active: {
        background: 'background-contrast',
        border: { color: 'brand', side: 'bottom', size: 'xsmall' },
      },
    },
    separator: {
      color: 'text-weak',
    },
    drop: {
      background: 'background-front',
      border: { color: 'border', size: 'small' },
      round: 'small',
      pad: 'xsmall',
      width: '20rem',
      column: {
        maxHeight: '16rem',
        gap: 'xxsmall',
        pad: { horizontal: 'xsmall' },
      },
      option: {
        container: {
          pad: { vertical: 'xsmall', horizontal: 'small' },
          round: 'xsmall',
          hover: { background: 'background-contrast' },
          selected: {
            background: 'selected',
            hover: { background: 'brand' },
          },
        },
        text: {
          size: 'small',
          selected: { color: 'white', weight: 600 },
        },
      },
    },
  },
};

export const CustomThemed = () => (
  <Grommet theme={theme}>
    <Box gap="medium" pad="large" width="medium">
      <Heading level={3} margin="none">
        Custom themed time input
      </Heading>
      <TimeInput format="12" defaultValue="10:15:20" />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed',
};
