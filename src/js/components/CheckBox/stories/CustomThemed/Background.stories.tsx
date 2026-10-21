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
  Paragraph,
  RadioButtonGroup,
  Text,
} from 'grommet';
import { ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const customTheme: ThemeType = {
  checkBox: {
    control: {
      background: { color: { light: 'light-3', dark: 'dark-3' } },
      hover: {
        background: { color: { light: 'accent-3', dark: 'neutral-3' } },
      },
      selected: {
        background: { color: { light: 'accent-1', dark: 'accent-2' } },
        hover: {
          background: { color: { light: 'accent-4', dark: 'neutral-4' } },
        },
      },
    },
    container: {
      background: { color: { light: 'light-2', dark: 'dark-2' } },
      hover: { background: { color: { light: 'light-4', dark: 'dark-4' } } },
    },
  },
};

const hpeTheme: ThemeType = deepMerge(hpe, {
  checkBox: {
    control: {
      background: 'background-front',
      border: 'blue',
      hover: {
        background: 'background-hover',
      },
      selected: {
        background: 'background-selected-primary-strong',
        border: 'border-selected-primary-strong',
        hover: {
          background: 'background-selected-primary-strong-hover',
        },
      },
    },
    check: { extend: undefined },
    extend: undefined,
  },
});

const BackgroundExample = () => {
  const [dark, setDark] = useState(false);
  const [value, setValue] = useState({ updates: true });
  const [theme, setTheme] = useState(hpeTheme);

  return (
    <Grommet
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
      background="background"
    >
      <Box pad="large" gap="medium">
        <Heading level={2} margin="none">
          Control backgrounds
        </Heading>
        <Paragraph>
          Hover a control or its label. Unselected and selected controls have
          distinct hover fills, independent of the outer label background.
          Container fills also apply to toggles without changing their tracks or
          knobs. Tab into the form to see the current state&apos;s hover fill.
        </Paragraph>
        <Box
          direction="row"
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
            label="Dark mode (toggle styling is unchanged)"
            checked={dark}
            onChange={(event) => setDark(event.target.checked)}
          />
        </Box>
        <Box gap="small" background="background-back" round pad="medium">
          <CheckBox label="Unchecked" />
          <CheckBox label="Selected" defaultChecked />
          <CheckBox label="Indeterminate" indeterminate />
          <CheckBox label="Disabled unchecked" disabled />
          <CheckBox label="Disabled selected" disabled checked />
        </Box>
        <Box gap="small" background="background-back" round pad="medium">
          <Form value={value} onChange={setValue}>
            <FormField name="updates" htmlFor="updates" label="Notifications">
              <CheckBox
                id="updates"
                name="updates"
                label="Send product updates"
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

const meta: Meta<typeof CheckBox> = {
  title: 'Input/CheckBox/Custom Themed/Background',
  component: CheckBox,
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Background: Story = {
  render: () => <BackgroundExample />,
};
