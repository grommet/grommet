// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';

export const Clear = () => {
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
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Clear',
};
