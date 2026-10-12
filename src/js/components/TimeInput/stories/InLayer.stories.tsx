// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, Button, Heading, Layer, TimeInput } from 'grommet';

// TimeInput rendered inside a modal Layer. While the drop is open, its own
// "Choose time" button gets aria-hidden/untabbable - this is universal
// Grommet behavior for any open Drop (every other open control is hidden
// while a popup is focused), not something specific to Layer nesting.
export const InLayer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box align="center" pad="large">
      <Button label="Open modal" onClick={() => setOpen(true)} />
      {open && (
        <Layer modal onEsc={() => setOpen(false)}>
          <Box pad="medium" gap="medium" width="medium">
            <Heading level={3} margin="none">
              Schedule
            </Heading>
            <TimeInput format="24" defaultValue="10:15:20" />
            <Button
              alignSelf="end"
              label="Close"
              onClick={() => setOpen(false)}
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/In Layer',
};
