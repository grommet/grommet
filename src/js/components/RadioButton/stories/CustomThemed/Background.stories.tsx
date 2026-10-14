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
  Text,
} from 'grommet';
import { ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const hpeTheme: ThemeType = deepMerge(hpe, {
  global: {
    colors: {
      'background-input': {
        light: 'rgba(255, 255, 255, 0.72)',
        dark: 'rgba(0, 0, 0, 0.04)',
      },
      'background-input-hover': {
        light: 'rgba(255, 255, 255, 0.72)',
        dark: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
  radioButton: {
    control: {
      background: 'background-input',
      hover: {
        background: 'background-input-hover',
      },
      selected: {
        background: { color: 'background-selected-primary-strong' },
        hover: {
          background: { color: 'background-selected-primary-strong-hover' },
        },
      },
    },
    check: {
      extend: undefined,
    },
    container: {
      background: { color: { light: 'light-1', dark: 'dark-1' } },
      hover: { background: { color: 'background-input-hover' } },
      // extend: undefined,
    },
    extend: undefined,
  },
});

const BackgroundExample = () => {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState('selected');
  const [value, setValue] = useState({ delivery: 'Standard' });

  return (
    <Grommet
      theme={hpeTheme}
      themeMode={dark ? 'dark' : 'light'}
      background={dark ? 'dark-2' : 'light-3'}
    >
      <Box pad="large" gap="medium" width="large">
        <Heading level={2} margin="none">
          Control backgrounds
        </Heading>
        <Text>
          Hover a control or its label. The circle fill and label background use
          independent control and container theme tokens. Unselected controls
          use background-input-hover; selected controls use
          background-selected-primary-strong-hover. Tab into the form to see the
          focused control use its state-specific hover fill.
        </Text>
        <CheckBox
          toggle
          label="Dark mode"
          checked={dark}
          onChange={(event) => setDark(event.target.checked)}
        />
        <Box gap="small">
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
        <Text size="small">Delivery selected: {value.delivery || 'None'}</Text>
      </Box>
    </Grommet>
  );
};

const meta: Meta<typeof RadioButton> = {
  title: 'Input/RadioButton/Custom Themed/Background',
  component: RadioButton,
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Background: Story = {
  render: () => <BackgroundExample />,
};
