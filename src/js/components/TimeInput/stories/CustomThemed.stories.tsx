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
    cursor: {
      background: 'accent-1',
      border: { side: 'bottom', size: 'medium', color: 'brand' },
      pad: { start: 'xsmall', end: 'xsmall' },
      round: { size: 'xsmall', corner: 'bottom' },
    },
    drop: {
      background: 'background-front',
      border: { color: 'brand', size: 'small' },
      gap: 'small',
      pad: 'small',
      round: 'small',
      columns: {
        background: 'background-back',
        border: { color: 'border', size: 'xsmall' },
        gap: 'xxsmall',
        pad: 'xxsmall',
        round: 'xsmall',
      },
      option: {
        background: 'background-front',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        round: 'xsmall',
        text: {
          color: 'text',
          size: 'small',
        },
        hover: {
          background: 'accent-1',
          text: { weight: 'bold' },
        },
        selected: {
          background: 'brand',
          text: { color: 'white', weight: 'bold' },
          hover: {
            background: 'neutral-1',
          },
        },
      },
    },
    dropButton: {
      background: 'brand',
      border: { color: 'brand', radius: 'small', width: 'small' },
      color: 'white',
      padding: { horizontal: 'small', vertical: 'small' },
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
