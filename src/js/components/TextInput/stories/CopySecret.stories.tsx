// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text, TextInput } from 'grommet';

// Stands in for retrieving the real secret from a secure store/API,
// fetched only at copy time so it never lives in component state or the DOM.
const fetchSecret = async () => 'secret-value';

// Caller-supplied mask; the input never displays or holds the real value.
const MASK = '••••••••••••';

export const CopySecret = () => {
  const [status, setStatus] = React.useState<string>('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Box width="medium" gap="small">
        <TextInput
          value={MASK}
          copy
          // onClickCopy fetches, copies, and discards the secret itself;
          // the masked value passed by TextInput is ignored.
          onClickCopy={async () => {
            const secret = await fetchSecret();
            await navigator.clipboard.writeText(secret);
            setStatus('Secret copied to clipboard');
            // `secret` falls out of scope here and is not retained.
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
