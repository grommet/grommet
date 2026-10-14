// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Grommet,
  Heading,
  RadioButtonGroup,
  Text,
  TextArea,
} from 'grommet';
import { ThemeType } from 'grommet/themes';

const theme: ThemeType = {
  global: {
    colors: {
      'form-surface': '#EEF2F6',
      'input-surface': '#FFFFFF',
      'input-hover': '#E6F0FF',
      'notes-surface': '#F8FAFF',
      'control-selected': '#D9E8FF',
      'control-selected-hover': '#B8D3FF',
    },
  },
  formField: {
    background: 'input-surface',
    hover: { background: 'input-hover' },
    textArea: { background: 'notes-surface' },
    checkBoxGroup: {
      background: 'transparent',
      hover: { background: 'transparent' },
    },
    radioButtonGroup: {
      background: 'transparent',
      hover: { background: 'transparent' },
    },
  },
  checkBox: {
    control: {
      background: 'input-surface',
      hover: { background: 'input-hover' },
      selected: {
        background: 'control-selected',
        hover: { background: 'control-selected-hover' },
      },
    },
  },
  radioButton: {
    control: {
      background: 'input-surface',
      hover: { background: 'input-hover' },
      selected: {
        background: 'control-selected',
        hover: { background: 'control-selected-hover' },
      },
    },
  },
};

const meta = {
  title: 'Input/FormField/Custom Themed/Background',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Background: Story = {
  render: () => (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <Box
          background="form-surface"
          pad="large"
          round="small"
          gap="medium"
          width="large"
        >
          <Box gap="small">
            <Heading level={2} margin="none">
              Input surfaces
            </Heading>
            <Text>
              Hover over each field. Labels and messages stay on the form
              surface, while checkbox and radio groups remain transparent.
            </Text>
          </Box>
          <Form>
            <FormField
              name="name"
              id="background-name"
              htmlFor="background-name"
              label="Name"
              help="A generated TextInput uses the shared surface."
            />
            <FormField
              name="notes"
              htmlFor="background-notes"
              label="Notes"
              info="TextArea overrides the normal surface per input."
            >
              <TextArea id="background-notes" name="notes" />
            </FormField>
            <FormField name="notifications" label="Notifications">
              <CheckBoxGroup
                aria-label="Notifications"
                name="notifications"
                options={['Email', 'Text message']}
                defaultValue={['Email']}
              />
            </FormField>
            <FormField name="delivery" label="Delivery frequency">
              <RadioButtonGroup
                aria-label="Delivery frequency"
                name="delivery"
                options={['Immediately', 'Daily digest']}
                defaultValue="Daily digest"
              />
            </FormField>
            <Button type="reset" label="Reset" />
          </Form>
        </Box>
      </Box>
    </Grommet>
  ),
};
