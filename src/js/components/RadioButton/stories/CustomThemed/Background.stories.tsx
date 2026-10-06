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

const theme: ThemeType = {
  radioButton: {
    background: { color: { light: 'light-2', dark: 'dark-2' } },
    check: {
      background: { color: { light: 'accent-1', dark: 'accent-2' } },
      hover: {
        background: { color: { light: 'accent-3', dark: 'neutral-3' } },
      },
    },
    hover: {
      background: { color: { light: 'light-1', dark: 'dark-1' } },
    },
  },
};

const BackgroundExample = () => {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState('selected');
  const [value, setValue] = useState({ delivery: 'Standard' });

  return (
    <Grommet
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
      background={dark ? 'dark-1' : 'light-1'}
    >
      <Box pad="large" gap="medium" width="large">
        <Heading level={2} margin="none">
          Control backgrounds
        </Heading>
        <Text>
          Hover a control or its label. The circle fill and label background use
          independent theme tokens. Tab into the form to see the focused control
          use its hover fill.
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
