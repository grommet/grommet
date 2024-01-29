import React from 'react';
import { Box, Grommet, TextInput } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <TextInput disabled aria-label="Input Text" />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TextInput/Disabled',
};
