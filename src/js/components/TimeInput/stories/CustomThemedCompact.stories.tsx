// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Grommet, Heading, ThemeType, TimeInput } from 'grommet';

const theme: ThemeType = {
  global: {
    colors: {
      text: 'white',
    },
  },
  timeInput: {
    container: {
      background: 'dark-2',
      border: { color: 'dark-2' },
      pad: { horizontal: 'xsmall', vertical: 'xxsmall' },
      round: 'xsmall',
    },
    cursor: {
      background: 'accent-3',
      border: { side: 'bottom', size: 'small', color: 'accent-3' },
      pad: { start: 'xxsmall', end: 'xxsmall' },
      round: { size: 'full', corner: 'bottom' },
    },
    drop: {
      background: 'dark-1',
      gap: 'xxsmall',
      pad: 'xsmall',
      round: 'small',
      columns: {
        background: 'dark-2',
        gap: 'none',
        pad: 'none',
        round: 'xsmall',
      },
      option: {
        background: 'dark-2',
        pad: { horizontal: 'small', vertical: 'xxsmall' },
        text: { color: 'white', size: 'small' },
        hover: {
          background: 'neutral-2',
          text: { weight: 'bold' },
        },
        selected: {
          background: 'accent-3',
          text: { color: 'black', weight: 'bold' },
        },
      },
    },
    dropButton: {
      background: 'accent-3',
      border: { radius: 'xsmall' },
      color: 'black',
      padding: { horizontal: 'xxsmall', vertical: 'xxsmall' },
    },
  },
};

export const CustomThemedCompact = () => (
  <Grommet theme={theme}>
    <Box gap="medium" pad="large" background="dark-3">
      <Heading level={3} margin="none" color="white">
        Compact 24-hour theme
      </Heading>
      <TimeInput format="24" showSeconds minuteStep={15} />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed/Compact',
};
