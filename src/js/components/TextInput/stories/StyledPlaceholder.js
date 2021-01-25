import React from 'react';

import { Box, Form, Grommet, TextInput, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const StyledPlaceholder = () => (
  <Grommet full theme={grommet}>
    <Box>
      <Form>
        <TextInput name="name" placeholder={<Text>placeholder</Text>} />
      </Form>
    </Box>
  </Grommet>
);

StyledPlaceholder.storyName = 'Styled placeholder';

export default {
  title: 'Input/TextInput/Styled placeholder',
};
