import React from 'react';

import { Box, Button, Grommet } from 'grommet';

export const CustomDisabledCursor = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box align="center" pad="medium">
      <Button label="Disabled" disabled />
    </Box>
  </Grommet>
);

CustomDisabledCursor.storyName = 'Custom disabled cursor';

export default {
  title: 'Controls/Button/Custom Themed/Custom disabled cursor',
};
