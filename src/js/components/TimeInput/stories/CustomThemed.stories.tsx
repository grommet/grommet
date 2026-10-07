// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Grommet, Heading, ThemeType, TimeInput } from 'grommet';

const theme: ThemeType = {
  timeInput: {
    container: {
      background: 'background-front',
      border: { color: 'brand', size: 'small' },
      pad: { horizontal: 'small', vertical: 'xsmall' },
      round: 'small',
      width: 'medium',
    },
    value: {
      pad: { start: 'xsmall', end: 'xsmall' },
      color: 'brand',
      weight: 'bold',
      placeholder: {
        color: 'text-xweak',
      },
      cursor: {
        background: 'accent-1',
        border: { size: 'medium', color: 'brand' },
        round: { size: 'xsmall', corner: 'bottom' },
        color: 'text',
      },
    },
    drop: {
      background: 'background-front',
      border: { color: 'brand', size: 'small' },
      gap: 'small',
      pad: 'small',
      round: 'small',
      column: {
        background: 'background-back',
        border: { color: 'border', size: 'xsmall' },
        gap: 'xxsmall',
        pad: 'xxsmall',
        round: 'xsmall',
      },
      option: {
        container: {
          background: 'background-front',
          pad: { horizontal: 'small', vertical: 'xsmall' },
          round: 'xsmall',
          hover: {
            background: 'accent-1',
          },
          selected: {
            background: 'brand',
            hover: {
              background: 'neutral-1',
            },
          },
        },
        text: {
          color: 'text',
          size: 'small',
          selected: { color: 'white', weight: 'bold' },
        },
      },
    },
    dropButton: {
      kind: {
        background: 'brand',
        border: { color: 'brand', radius: 'small', width: 'small' },
        color: 'pink',
        padding: { horizontal: 'small', vertical: 'small' },
      },
    },
  },
};

export const CustomThemed = () => (
  <Grommet theme={theme}>
    <Box gap="medium" pad="large" background="background-back">
      <Heading level={3} margin="none">
        Full TimeInput theme
      </Heading>
      <TimeInput format="12" showSeconds defaultValue="09:45:10" />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed/Full',
};
