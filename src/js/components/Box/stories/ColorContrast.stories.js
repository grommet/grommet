// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text } from 'grommet';

// Colors whose light/dark classification flips between the legacy
// perceived-brightness formula and WCAG 2.2 relative luminance, evaluated
// against the default theme's actual text colors (#f8f8f8 / #444444),
// which raise the equal-contrast threshold to ~0.2766.
// https://github.com/grommet/grommet/issues/8151
const flippedColors = ['#00a4b3', '#17a398', '#00aaaa', '#00a0be'];

// Colors that classify the same under both formulas, used as anchors.
const stableColors = ['#000000', '#666666', '#999999', '#FFFFFF'];

export const ColorContrast = () => (
  <Box pad="small" gap="small" align="start">
    {[...flippedColors, ...stableColors].map((color) => (
      <Box key={color} pad="small" background={color} width="medium">
        <Text>{color}</Text>
      </Box>
    ))}
  </Box>
);

export default {
  title: 'Layout/Box/Color Contrast',
};
