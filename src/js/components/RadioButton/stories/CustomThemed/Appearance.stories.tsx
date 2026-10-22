// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Heading,
  RadioButton,
  RadioButtonGroup,
} from 'grommet';
import { ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const customTheme: ThemeType = {
  global: {
    colors: {
      background: { light: 'light-1', dark: 'dark-1' },
    },
  },
  radioButton: {
    control: {
      background: { color: { light: 'light-3', dark: 'dark-3' } },
      border: { color: 'border', size: 'xsmall' },
      height: '32px',
      width: '32px',
      pad: 'none',
      round: 'full',
      hover: {
        background: { color: { light: 'accent-3', dark: 'neutral-3' } },
        border: { color: 'accent-3' },
      },
      selected: {
        background: { color: { light: 'accent-1', dark: 'accent-2' } },
        border: { color: 'accent-1' },
        hover: {
          background: { color: { light: 'accent-4', dark: 'neutral-4' } },
          border: { color: 'accent-4' },
        },
      },
    },
    container: {
      background: { color: { light: 'light-2', dark: 'dark-2' } },
      border: { color: 'border', size: 'xsmall' },
      elevation: 'none',
      margin: { bottom: 'xxsmall' },
      pad: { horizontal: 'small', vertical: 'xsmall' },
      round: 'xsmall',
      width: { min: '240px' },
      hover: {
        background: { color: { light: 'light-4', dark: 'dark-4' } },
        border: { color: 'accent-3' },
        elevation: 'small',
      },
    },
  },
};

const hpeTheme: ThemeType = deepMerge(hpe, {
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
    container: { extend: undefined },
    extend: undefined,
  },
});

const AppearanceExample = () => {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState('selected');
  const [value, setValue] = useState({ delivery: 'Standard' });
  const [theme, setTheme] = useState(hpeTheme);

  return (
    <Grommet
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
      background="background"
    >
      <Box pad="large" gap="medium">
        <Heading level={2} margin="none">
          Preferences
        </Heading>
        <Box
          direction="row"
          wrap
          gap="large"
          border={{ color: 'border', size: 'small', side: 'bottom' }}
          pad="small"
        >
          <RadioButtonGroup
            name="theme"
            options={['Custom', 'HPE']}
            value={theme === customTheme ? 'Custom' : 'HPE'}
            onChange={(event) =>
              setTheme(event.target.value === 'Custom' ? customTheme : hpeTheme)
            }
          />
          <CheckBox
            toggle
            label="Dark mode"
            checked={dark}
            onChange={(event) => setDark(event.target.checked)}
          />
        </Box>
        <Box gap="small" background="background-back" pad="small" round>
          <RadioButton
            name="example"
            label="Unchecked"
            value="unchecked"
            checked={selected === 'unchecked'}
            onChange={(event) => setSelected(event.target.value)}
          />
          <RadioButton
            name="example"
            label="Selected"
            value="selected"
            checked={selected === 'selected'}
            onChange={(event) => setSelected(event.target.value)}
          />
          <RadioButton
            name="disabled-unchecked"
            label="Disabled unchecked"
            disabled
          />
          <RadioButton
            name="disabled-selected"
            label="Disabled selected"
            disabled
            checked
          />
        </Box>
        <Box gap="small" background="background-back" pad="small" round>
          <Form value={value} onChange={setValue}>
            <FormField name="delivery" label="Delivery">
              <RadioButtonGroup
                aria-label="Delivery"
                name="delivery"
                options={[
                  'Standard',
                  'Express',
                  {
                    label: 'Unavailable',
                    value: 'Unavailable',
                    disabled: true,
                  },
                ]}
              />
            </FormField>
            <Box direction="row" gap="small" margin={{ top: 'medium' }}>
              <Button type="submit" label="Submit" primary />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

const meta: Meta<typeof RadioButton> = {
  title: 'Input/RadioButton/Custom Themed/Appearance',
  component: RadioButton,
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Appearance: Story = {
  render: () => <AppearanceExample />,
};
