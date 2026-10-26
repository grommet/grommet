// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Button,
  CheckBox,
  CheckBoxGroup,
  DateInput,
  FileInput,
  Form,
  FormField,
  Grommet,
  Heading,
  MaskedInput,
  Paragraph,
  RadioButtonGroup,
  Select,
  SelectMultiple,
  TextArea,
  TextInput,
} from 'grommet';
import { ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const customTheme: ThemeType = {
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
      border: { color: 'transparent' },
      error: { border: { color: 'status-critical' } },
      hover: { background: 'transparent' },
    },
    radioButtonGroup: {
      background: 'transparent',
      border: { color: 'transparent' },
      error: { border: { color: 'status-critical' } },
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

const hpeTheme: ThemeType = deepMerge(hpe, {
  global: {
    colors: {
      'form-surface': 'background-back',
    },
    input: {
      extend: undefined,
      background: 'lightblue',
      border: { color: 'red' },
      font: {},
      pad: { horizontal: 'small', vertical: 'xsmall' },
      padding: {},
      round: 'xsmall',
      placeholder: { color: 'placeholder', weight: 400 },
      // Application states
      disabled: {
        background: 'background-contrast',
        border: { color: 'border' },
      },
      readOnly: { background: 'background-back', border: { color: 'border' } },
      // Interactive states
      hover: {
        background: 'background-hover',
        border: { color: 'border-strong' },
      },
      focus: { border: { color: 'focus' } },
    },
  },
  checkBox: {
    container: {
      width: 'auto',
      pad: { vertical: '3xsmall', horizontal: 'xxsmall' },
      round: 'xsmall',
      hover: {
        background: 'background-hover',
        extend: undefined,
      },
      extend: undefined,
    },
    control: {
      background: 'background-front',
      hover: {
        background: 'background-hover',
        border: { color: 'border-strong' },
      },
      selected: {
        background: 'background-selected-primary-strong',
        border: {
          color: 'border-selected',
        },
        hover: {
          background: 'background-selected-primary-strong-hover',
        },
      },
    },
    check: { extend: undefined },
    hover: {
      extend: undefined,
    },
    icon: { extend: undefined },
    extend: undefined,
  },
  checkBoxGroup: {
    container: {
      gap: 'none',
      extend: undefined,
    },
    extend: undefined,
  },
  formField: {
    background: 'background-front',
    checkBoxGroup: {
      background: 'transparent',
      border: {
        color: 'transparent',
      },
      container: {
        extend: undefined,
      },
      error: {
        border: {
          color: 'border-critical',
        },
      },
    },
    radioButtonGroup: {
      background: 'transparent',
      border: {
        color: 'transparent',
      },
      error: { border: { color: 'border-critical' } },
      container: {
        extend: undefined,
      },
    },
    extend: undefined,
  },
  radioButton: {
    control: {
      background: 'background-front',
      hover: {
        background: 'background-hover',
        border: { color: 'border-strong' },
      },
      selected: {
        background: 'background-selected-primary-strong',
        border: { color: 'border-selected' },
        hover: { background: 'background-selected-primary-strong-hover' },
      },
    },
    check: { extend: undefined },
    container: {
      width: 'auto',
      pad: { vertical: '3xsmall', horizontal: 'xxsmall' },
      round: 'xsmall',
      hover: { background: 'background-hover' },
      extend: undefined,
    },
    icon: { extend: undefined },
    extend: undefined,
  },
  radioButtonGroup: {
    container: {
      gap: 'none',
      extend: undefined,
    },
    extend: undefined,
  },
});

const AppearanceStory = () => {
  const [theme, setTheme] = React.useState(hpeTheme);
  const [themeMode, setThemeMode] = React.useState<'auto' | 'light' | 'dark'>(
    'auto',
  );
  const [error, setError] = React.useState(false);

  return (
    <Grommet theme={theme} themeMode={themeMode}>
      <Box pad="large" gap="large">
        <Box direction="row" gap="medium">
          <RadioButtonGroup
            aria-label="Theme"
            direction="row"
            name="theme"
            options={['Custom', 'HPE']}
            defaultValue="HPE"
            onChange={(event) => {
              const nextTheme =
                event.target.value === 'HPE' ? hpeTheme : customTheme;
              setTheme(nextTheme);
            }}
          />
          <CheckBox
            label="Theme mode"
            name="themeMode"
            checked={themeMode === 'dark'}
            onChange={(event) =>
              setThemeMode(event.target.checked ? 'dark' : 'light')
            }
            toggle
          />
          <CheckBox
            label="Error"
            name="error"
            checked={error}
            onChange={(event) => setError(event.target.checked)}
            toggle
          />
        </Box>
        <Box direction="row" gap="medium">
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
              <Paragraph>
                Hover over each field. Labels and messages stay on the form
                surface, while checkbox and radio groups remain transparent.
              </Paragraph>
            </Box>
            <Form>
              <Box gap="medium" width="medium">
                <>
                  <FormField
                    name="name"
                    id="background-name"
                    htmlFor="background-name"
                    label="Name"
                    help="A generated TextInput uses the shared surface."
                    error={error}
                  />
                  <FormField
                    name="notes"
                    htmlFor="background-notes"
                    label="Notes"
                    info="TextArea overrides the normal surface per input."
                    error={error}
                  >
                    <TextArea id="background-notes" name="notes" />
                  </FormField>
                  <FormField
                    name="notifications"
                    label="Notifications"
                    error={error}
                  >
                    <CheckBoxGroup
                      aria-label="Notifications"
                      name="notifications"
                      options={['Email', 'Text message']}
                      defaultValue={['Email']}
                    />
                  </FormField>
                  <FormField
                    name="delivery"
                    label="Delivery frequency"
                    error={error}
                  >
                    <RadioButtonGroup
                      aria-label="Delivery frequency"
                      name="delivery"
                      options={['Immediately', 'Daily digest']}
                      defaultValue="Daily digest"
                    />
                  </FormField>
                </>
                <Button type="reset" label="Reset" alignSelf="start" />
              </Box>
            </Form>
            <>
              <Paragraph margin="none">
                Here are some things that I want to inform you about and ensure
                you understand before proceeding.
              </Paragraph>
              <CheckBox label="I agree" name="agreement" />
            </>
          </Box>
          <Box
            background="form-surface"
            pad="large"
            round="small"
            gap="medium"
            width="large"
          >
            <Box gap="small">
              <Heading level={2} margin="none">
                Input surfaces (sans FormField)
              </Heading>
              <Paragraph>
                Hover over each field. Labels and messages stay on the form
                surface, while checkbox and radio groups remain transparent.
              </Paragraph>
            </Box>
            <Form>
              <Box gap="medium" width="medium">
                <Box gap="xsmall">
                  <TextInput name="name" placeholder="TextInput" />
                  <TextInput
                    aria-label="Disabled input"
                    placeholder="Disabled"
                    disabled
                  />
                  <TextInput
                    aria-label="Read-only input"
                    value="Read-only"
                    readOnly
                  />
                  <TextArea name="notes" placeholder="TextArea" />
                  <Select
                    name="fruit"
                    options={['Apple', 'Orange', 'Banana']}
                    placeholder="Select a fruit"
                  />
                  <SelectMultiple
                    name="fruits"
                    options={['Apple', 'Orange', 'Banana']}
                    placeholder="Select multiple fruits"
                  />
                  <DateInput
                    name="date"
                    format="mm/dd/yyyy"
                    placeholder="Select a date"
                  />
                  <FileInput name="file" placeholder="Select a file" />
                  <MaskedInput
                    name="phone"
                    mask={[
                      { fixed: '(' },
                      { length: 3, regexp: /^[0-9]{1,3}$/ },
                      { fixed: ')' },
                      { fixed: ' ' },
                      { length: 3, regexp: /^[0-9]{1,3}$/ },
                      { fixed: '-' },
                      { length: 4, regexp: /^[0-9]{1,4}$/ },
                    ]}
                    placeholder="(123) 456-7890"
                  />
                  <CheckBoxGroup
                    aria-label="Notifications"
                    name="notifications"
                    options={['Email', 'Text message']}
                    defaultValue={['Email']}
                  />
                  <RadioButtonGroup
                    aria-label="Delivery frequency"
                    name="delivery"
                    options={['Immediately', 'Daily digest']}
                    defaultValue="Daily digest"
                  />
                </Box>
                <Button type="reset" label="Reset" alignSelf="start" />
              </Box>
            </Form>
            <>
              <Paragraph margin="none">
                Here are some things that I want to inform you about and ensure
                you understand before proceeding.
              </Paragraph>
              <CheckBox label="I agree" name="agreement" />
            </>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

type Story = StoryObj<typeof meta>;

export const Appearance: Story = {
  render: () => <AppearanceStory />,
};

const meta = {
  title: 'Input/FormField/Custom Themed/Appearance',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
