// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, CheckBox, TimeInput } from 'grommet';

export const ShowSeconds = () => {
  const [showSeconds, setShowSeconds] = useState(false);

  return (
    <Box pad="large" width="medium" gap="small">
      <TimeInput
        format="12"
        showSeconds={showSeconds}
        defaultValue="12:34:56"
      />
      <CheckBox
        label="Show seconds"
        checked={showSeconds}
        onChange={(event) => setShowSeconds(event.target.checked)}
      />
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/ShowSeconds',
};
