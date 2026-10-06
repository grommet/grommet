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
  Text,
} from 'grommet';
import { ThemeType } from 'grommet/themes';

const theme: ThemeType = {
  checkBox: {
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
  const [value, setValue] = useState({ updates: true });

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
          Hover a control or its label. The control fill and label background
          use independent theme tokens. Tab into the form to see the focused
          control use its hover fill.
        </Text>
        <CheckBox
          toggle
          label="Dark mode (toggle styling is unchanged)"
          checked={dark}
          onChange={(event) => setDark(event.target.checked)}
        />
        <Box gap="small">
          <CheckBox label="Unchecked" />
          <CheckBox label="Selected" defaultChecked />
          <CheckBox label="Indeterminate" indeterminate />
          <CheckBox label="Disabled unchecked" disabled />
          <CheckBox label="Disabled selected" disabled checked />
        </Box>
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
        <Text size="small">Updates selected: {String(value.updates)}</Text>
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
