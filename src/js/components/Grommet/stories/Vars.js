import React from 'react';

import { grommet, Grommet, Box } from 'grommet';

export const Vars = () => (
  <Grommet theme={grommet} cssVars>
    <Box pad="medium" background="var(--accent-2)" gap="medium">
      <Box>
        Checkout Grommet variables, you can find them in the StyledGrommet DOM.
      </Box>
      <Box with>
        For example, the background color in this Box is using var(--accent-2)
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Grommet/Vars',
};
