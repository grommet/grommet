import React from 'react';

import { Box, Form, TextInput, Text } from 'grommet';

const StyledPlaceholderExample = () => (
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

export const StyledPlaceholder = {
  name: 'Styled placeholder',
  render: StyledPlaceholderExample,
};

export default {
  title: 'Input/TextInput/Styled placeholder',
};
