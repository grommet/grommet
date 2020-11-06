import React from 'react';

import { grommet, Box, Button, Grommet } from 'grommet';

export const TipOnButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button label="Default" onClick={() => {}} tip="shimi" />
    </Box>
  </Grommet>
);
