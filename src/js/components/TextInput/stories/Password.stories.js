// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, TextInput } from 'grommet';

export const Password = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box width="medium" margin="large">
      <TextInput
        type="password"
        password
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Password"
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Password',
};
