// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export const CopySecret = () => {
  const [status, setStatus] = React.useState<string>('');
  const secret = 'secret-value';

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Box width="medium" gap="small">
        <TextInput
          value={secret}
          password
          copy
          // The callback receives the unmasked value. Never log or persist it.
          onClickCopy={async (_event, copiedValue) => {
            await navigator.clipboard.writeText(copiedValue);
            setStatus('Secret copied to clipboard');
          }}
          aria-label="Secret"
        />
        {status && <Text>{status}</Text>}
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Copy Secret',
};
