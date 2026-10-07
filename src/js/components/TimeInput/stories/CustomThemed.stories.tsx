// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Grommet, Heading, TimeInput, ThemeType } from 'grommet';

const theme: ThemeType = {
  timeInput: {
    container: {
      border: { color: 'brand', size: 'small' },
      round: 'small',
    },
    value: {
      pad: { horizontal: 'small' },
      background: 'background-front',
      round: 'xsmall',
    },
    segment: {
      color: 'text',
      placeholder: { color: 'text-weak' },
      size: 'medium',
      weight: 500,
      pad: 'xxsmall',
      active: {
        background: 'background-contrast',
        border: { color: 'brand', side: 'bottom', size: 'small' },
      },
    },
    dropButton: {
      background: 'brand',
      color: 'white',
      padding: { vertical: 'xsmall', horizontal: 'small' },
    },
    drop: {
      background: 'background-front',
      border: { color: 'border', size: 'small' },
      round: 'small',
      pad: 'xsmall',
      width: '20rem',
      column: {
        height: { max: 'medium' },
        gap: 'xxsmall',
        pad: { horizontal: 'xsmall' },
        round: 'small',
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
