// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Clock } from '@hpe-design/icons-grommet';
import { hpe } from 'grommet-theme-hpe';
import {
  Box,
  Grommet,
  Heading,
  ThemeContext,
  ThemeType,
  TimeInput,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import {
  components,
  dimension,
  global as globalTokens,
} from 'hpe-design-tokens/grommet';

const { hpe: hpeComponents } = components;
const { hpe: hpeDimension } = dimension;
const { hpe: hpeGlobal } = globalTokens;

const theme: ThemeType = deepMerge({}, hpe);
theme.timeInput = {
  container: {
    round: hpeComponents.formField.default.medium.input.container.borderRadius,
  },
  value: {
    pad: {
      start: hpeDimension.spacing['5xsmall'],
      end: hpeDimension.spacing['5xsmall'],
    },
    cursor: {
      background: 'background-active',
      border: {
        side: 'bottom',
        size: 'small',
        color: 'focus',
      },
      pad: {
        start: hpeDimension.spacing['5xsmall'],
        end: hpeDimension.spacing['5xsmall'],
      },
    },
  },
  drop: {
    columns: {
      pad: { horizontal: '3xsmall' },
    },
    pad: { horizontal: '3xsmall', vertical: 'xsmall' },
    option: {
      gap: hpeDimension.spacing['4xsmall'],
      pad: {
        vertical: hpeComponents.element.medium.paddingY,
        horizontal: hpeComponents.element.medium.paddingX.default,
      },
      round: hpeDimension.radius.xxsmall,
      text: {
        size: hpeDimension.text.medium.fontSize,
      },
      hover: {
        background: 'background-active',
      },
      selected: {
        background: 'background-selected-primary-strong',

        text: {
          color: 'text-onSelectedPrimaryStrong',
          weight: hpeGlobal.fontWeight.medium,
        },
        hover: {
          background: 'background-selected-primary-strong-hover',
        },
      },
    },
  },
  dropButton: {
    icon: Clock,
    padding: {
      vertical: hpeComponents.button.toolbar.medium.iconOnly.paddingY,
      horizontal: hpeComponents.button.toolbar.medium.iconOnly.paddingX,
    },
  },
};

export const CustomThemedHpe = () => (
  <Grommet theme={theme}>
    <Box gap="xlarge" pad="large">
      <Box width="medium" gap="medium">
        <Heading level={3} margin="none">
          Full TimeInput theme, extending grommet-theme-hpe
        </Heading>
        <TimeInput format="12" showSeconds />
        <TimeInput format="12" />
        <TimeInput format="24" showSeconds />
        <TimeInput format="24" />
      </Box>
      <ThemeContext.Extend value={{ dark: true }}>
        <Box
          width="medium"
          gap="medium"
          pad="large"
          background="background-front"
        >
          <Heading level={3} margin="none">
            Dark Theme
          </Heading>
          <TimeInput format="12" showSeconds />
          <TimeInput format="12" />
          <TimeInput format="24" showSeconds />
          <TimeInput format="24" />
        </Box>
      </ThemeContext.Extend>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TimeInput/Custom Themed/Hpe',
};
