// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text, TextInput } from 'grommet';

export const Copy = () => {
  const [value, setValue] = React.useState('Editable value');
  const [status, setStatus] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Box width="medium" gap="small">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          copy
          aria-label="Editable value"
        />
        <TextInput
          value="Custom copy handler"
          copy
          onCopy={(event, copiedValue) =>
            setStatus(`Custom copy handler called with "${copiedValue}"`)
          }
          aria-label="Custom copy handler"
        />
        {status && <Text>{status}</Text>}
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Copy',
};
