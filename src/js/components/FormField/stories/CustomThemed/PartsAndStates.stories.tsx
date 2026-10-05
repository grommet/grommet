// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { StoryObj } from '@storybook/react';

import {
  Box,
  CheckBox,
  CheckBoxGroup,
  Form,
  FormField,
  Grommet,
  RadioButtonGroup,
  Select,
  TextInput,
  StarRating,
} from 'grommet';
import { ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const backgroundInput = {
  dark: 'rgba(0, 0, 0, 0.04)',
  light: 'rgba(255, 255, 255, 0.72)',
};

const backgroundInputHover = {
  dark: 'rgba(0, 0, 0, 0.04)',
  light: 'rgba(255, 255, 255, 0.72)',
};

const formFieldBackground = {
  color: backgroundInput,
};

const formFieldBackgroundHover = {
  color: backgroundInputHover,
};

const groupedInputContent = {
  background: 'transparent',
  border: {
    color: 'transparent',
  },
  error: {
    hover: {
      background: 'background-critical',
    },
  },
  hover: {
    background: 'transparent',
    border: {
      color: 'transparent',
    },
  },
};

// Mock values matching hpe-design-tokens 2.4.0 semantic background roles.
const mockHpeTheme: ThemeType = {
  checkBox: {},
  formField: {
    content: {
      background: formFieldBackground,
      error: {
        border: { color: 'status-critical' },
        background: {
          color: 'background-critical',
        },
        hover: {
          background: 'background-critical',
        },
      },
      hover: {
        background: formFieldBackgroundHover,
      },
      readOnly: {
        background: {
          color: 'background-contrast',
        },
      },
    },
    inputs: {
      checkBox: {
        content: {
          background: 'transparent',
          hover: {
            background: 'background-contrast',
          },
        },
      },
      checkBoxGroup: {
        content: groupedInputContent,
      },
      radioButtonGroup: {
        content: groupedInputContent,
      },
      starRating: {
        content: groupedInputContent,
      },
    },
    checkBoxGroup: undefined,
    radioButtonGroup: undefined,
    starRating: undefined,
  },
};

const theme = deepMerge(hpe, mockHpeTheme);

export const PartsAndStates: StoryObj = {
  render: () => (
    <Grommet theme={theme} background="background-back" full>
      <Form>
        <Box direction="row-responsive" gap="large" pad="large">
          <Box gap="medium" width="medium">
            <FormField
              label="Text input"
              htmlFor="editable"
              help="This is a helpful message"
            >
              <TextInput id="editable" placeholder="At-rest input fill" />
            </FormField>
            <FormField label="Select input">
              <Select
                placeholder="At-rest input fill"
                options={['Apples', 'Oranges', 'Bananas']}
              />
            </FormField>
            <FormField name="checkbox-simple">
              <CheckBox
                name="checkbox-simple"
                label="Choice"
                id="simple-checkbox"
              />
            </FormField>
            <FormField name="toggle">
              <CheckBox name="toggle" label="On" id="toggle" toggle />
            </FormField>
            <FormField label="Checkbox options">
              <CheckBoxGroup options={['First choice', 'Second choice']} />
            </FormField>
            <FormField label="Radio options">
              <RadioButtonGroup
                name="radio-options"
                options={['First choice', 'Second choice']}
              />
            </FormField>
            <FormField label="Star rating">
              <StarRating name="star-rating" />
            </FormField>
          </Box>
          <Box gap="medium" width="medium">
            <FormField label="Text input" error="Example error">
              <TextInput placeholder="At-rest input fill" />
            </FormField>
            <FormField label="Select input" error="Example error">
              <Select
                placeholder="At-rest input fill"
                options={['Apples', 'Oranges', 'Bananas']}
              />
            </FormField>
            <FormField name="checkbox-simple" error="Example error">
              <CheckBox
                name="checkbox-simple"
                label="Choice"
                id="simple-checkbox"
              />
            </FormField>
            <FormField label="Checkbox options" error="Example error">
              <CheckBoxGroup options={['First choice', 'Second choice']} />
            </FormField>
            <FormField label="Radio options" error="Example error">
              <RadioButtonGroup
                name="radio-options-error"
                options={['First choice', 'Second choice']}
              />
            </FormField>
          </Box>
          <Box gap="medium" width="medium">
            <FormField label="Text input" disabled>
              <TextInput placeholder="At-rest input fill" disabled />
            </FormField>
            <FormField label="Select input" disabled>
              <Select
                placeholder="At-rest input fill"
                options={['Apples', 'Oranges', 'Bananas']}
                disabled
              />
            </FormField>
            <FormField name="checkbox-simple" disabled>
              <CheckBox
                name="checkbox-simple"
                label="Choice"
                id="simple-checkbox"
                disabled
              />
            </FormField>
            <FormField label="Checkbox options" disabled>
              <CheckBoxGroup
                options={['First choice', 'Second choice']}
                disabled
              />
            </FormField>
            <FormField label="Radio options" disabled>
              <RadioButtonGroup
                name="radio-options-disabled"
                options={['First choice', 'Second choice']}
                disabled
              />
            </FormField>
            <FormField
              label="Read-only internal input"
              name="readOnly"
              htmlFor="read-only"
              id="read-only"
              value="Preserved value"
              readOnly
            />
          </Box>
        </Box>
      </Form>
    </Grommet>
  ),
};

export default {
  title: 'Input/FormField/Custom Themed/Parts And States',
};
