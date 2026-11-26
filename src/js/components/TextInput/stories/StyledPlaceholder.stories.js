// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Form, TextInput, Text } from 'grommet';

export const StyledPlaceholder = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <Form>
      <TextInput
        name="name"
        placeholder={<Text>placeholder</Text>}
        aria-label="Input Text"
      />
    </Form>
  </Box>
  // </Grommet>
);

StyledPlaceholder.storyName = 'Styled placeholder';

export default {
  title: 'Input/TextInput/Styled placeholder',
};
