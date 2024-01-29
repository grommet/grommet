import React from 'react';
import { Box, Grommet, TextArea } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box align="center" pad="large">
      <TextArea aria-label="text area" disabled resize />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TextArea/Disabled',
};
