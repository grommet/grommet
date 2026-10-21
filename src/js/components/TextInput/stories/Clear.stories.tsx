// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';

const meta: Meta<typeof TextInput> = {
  title: 'Input/TextInput/Clear',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const ClearExample = () => {
  const [value, setValue] = React.useState<string>('Clearable value');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Box width="medium" gap="small">
        <TextInput
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          clear
          aria-label="Controlled value"
        />
        <TextInput
          defaultValue="Uncontrolled value"
          clear
          aria-label="Uncontrolled value"
        />
        <TextInput
          icon={<Search />}
          placeholder="Search"
          clear
          aria-label="Search"
        />
        <TextInput
          icon={<Search />}
          reverse
          placeholder="Search"
          clear
          aria-label="Search"
        />
        <TextInput
          icon={<Search />}
          reverse
          password
          clear
          copy
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

export const Clear: Story = {
  render: () => <ClearExample />,
};
